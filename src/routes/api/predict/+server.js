import { json } from '@sveltejs/kit';

// --- PREDICTION ENGINE V5.0 ---
// Logically consistent, full-featured, with strong analysis.
function generateFullAnalysis(stats) {
    const { teamA, teamB } = stats;
    let analysis = {};

    // --- Core Factor Calculation ---
    const teamA_Attack = (teamA.goals * 1.8) + (teamA.shotsOnTarget * 0.25) + (teamA.possession / 20);
    const teamA_Defense = (teamA.conceded * 1.8) + (teamA.fouls * 0.15);
    const teamB_Attack = (teamB.goals * 1.8) + (teamB.shotsOnTarget * 0.25) + (teamB.possession / 20);
    const teamB_Defense = (teamB.conceded * 1.8) + (teamB.fouls * 0.15);

    const strengthDifference = (teamA_Attack - teamA_Defense) - (teamB_Attack - teamB_Defense);

    // --- Step 1: Predict the Score (This is now the primary calculation) ---
    let predictedGoalsA = Math.round(Math.max(0, teamA_Attack / 2.2 - teamB_Defense / 4));
    let predictedGoalsB = Math.round(Math.max(0, teamB_Attack / 2.2 - teamA_Defense / 4));

    // Refine draw scores to avoid too many 0-0s
    if (Math.abs(strengthDifference) < 1.0 && predictedGoalsA === 0 && predictedGoalsB === 0) {
        if (teamA_Attack > 3.0 || teamB_Attack > 3.0) { // If at least one team has decent attack
            predictedGoalsA = 1;
            predictedGoalsB = 1;
        }
    }
    
    analysis.correctScore = {
      outcome: `${predictedGoalsA} - ${predictedGoalsB}`,
      confidence: 60 - Math.abs(strengthDifference),
      analysis: `Scoreline projected from each team's calculated attack rating versus the opponent's defensive rating.`
    };

    // --- Step 2: Derive Winner, BTTS, and other outcomes from the predicted score for 100% consistency ---
    
    // Match Winner
    let winner;
    if (predictedGoalsA > predictedGoalsB) winner = "Team A to Win";
    else if (predictedGoalsB > predictedGoalsA) winner = "Team B to Win";
    else winner = "Draw";
    
    analysis.matchWinner = {
      outcome: winner,
      confidence: 65 + Math.abs(strengthDifference) * 4,
      analysis: `The model favors the team with the superior Attack vs. Defense rating differential.`
    };

    // Both Teams to Score (BTTS)
    analysis.btts = {
      outcome: (predictedGoalsA > 0 && predictedGoalsB > 0) ? 'Yes' : 'No',
      confidence: (predictedGoalsA > 0 && predictedGoalsB > 0) ? (70 + (teamA_Attack + teamB_Attack)) : (75 - (teamA_Attack + teamB_Attack)),
      analysis: `Derived directly from the score prediction. Both teams are projected to find the net.`
    };
    if (analysis.btts.outcome === 'No') {
      analysis.btts.analysis = `Derived directly from the score prediction. At least one team is expected to keep a clean sheet.`
    }

    // Corners & Fouls
    analysis.corners = {
        outcome: `${Math.round(teamA.corners + teamB.corners)} Corners`,
        confidence: 80,
        analysis: `Based on the combined sum of both teams' average corners per game.`
    };
    analysis.fouls = {
        outcome: `Team ${teamA.fouls > teamB.fouls ? 'A' : 'B'} to foul more`,
        confidence: 60 + Math.abs(teamA.fouls - teamB.fouls) * 5,
        analysis: `The team with a higher historical fouls-per-game average is expected to be more aggressive.`
    };
    
    // Final Formatting
    Object.values(analysis).forEach(p => { p.confidence = Math.min(95, Math.max(45, Math.round(p.confidence))); });
    return analysis;
}


/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const stats = await request.json();
        const predictions = generateFullAnalysis(stats);
        return json(predictions);
    } catch (error) {
        return json({ error: error.message }, { status: 400 });
    }
}