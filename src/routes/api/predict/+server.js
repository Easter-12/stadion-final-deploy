import { json } from '@sveltejs/kit';

function generateProfessionalAnalysis(stats) {
    const { teamA, teamB } = stats;
    let analysis = {};
    const factors = { attack: (goals, shots) => (goals * 1.5) + (shots * 0.2), defense: (conceded, fouls) => (conceded * 1.5) + (fouls * 0.1), control: (possession) => (possession - 50) / 10 };
    const teamAScores = { attack: factors.attack(teamA.goals, teamA.shotsOnTarget), defense: factors.defense(teamA.conceded, teamA.fouls), control: factors.control(teamA.possession) };
    const teamBScores = { attack: factors.attack(teamB.goals, teamB.shotsOnTarget), defense: factors.defense(teamB.conceded, teamB.fouls), control: factors.control(teamB.possession) };
    const overallScoreA = teamAScores.attack - teamBScores.defense + teamAScores.control;
    const overallScoreB = teamBScores.attack - teamAScores.defense + teamBScores.control;
    const scoreDifference = overallScoreA - overallScoreB;
    let winner, winnerConfidence, winnerAnalysis;
    if (scoreDifference > 1.5) {
        winner = "Team A to Win";
        winnerAnalysis = `Team A's significant offensive advantage (Attack Score: ${teamAScores.attack.toFixed(1)}) and superior match control (Possession: ${teamA.possession}%) are key differentiators.`;
        winnerConfidence = 60 + scoreDifference * 4;
    } else if (scoreDifference < -1.5) {
        winner = "Team B to Win";
        winnerAnalysis = `Team B demonstrates overwhelming attacking prowess (Attack Score: ${teamBScores.attack.toFixed(1)}) that is likely to bypass Team A's defenses.`;
        winnerConfidence = 60 + Math.abs(scoreDifference) * 4;
    } else {
        winner = "Draw";
        winnerAnalysis = `A very close matchup. Team A's control (Possession: ${teamA.possession}%) is balanced by Team B's attacking efficiency. A stalemate is the most probable outcome.`;
        winnerConfidence = 70 - Math.abs(scoreDifference) * 5;
    }
    analysis.matchWinner = { outcome: winner, confidence: winnerConfidence, analysis: winnerAnalysis };
    const predictedGoalsA = Math.round(Math.max(0, teamAScores.attack / 2.5 - teamBScores.defense / 5));
    const predictedGoalsB = Math.round(Math.max(0, teamBScores.attack / 2.5 - teamAScores.defense / 5));
    analysis.correctScore = {
        outcome: `${predictedGoalsA} - ${predictedGoalsB}`,
        confidence: analysis.matchWinner.confidence * 0.7,
        analysis: `Calculated based on each team's attack score versus the opponent's defensive liabilities.`
    };
    Object.values(analysis).forEach(p => { p.confidence = Math.min(95, Math.max(45, Math.round(p.confidence))); });
    return analysis;
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const stats = await request.json();
        const predictions = generateProfessionalAnalysis(stats);
        return json(predictions);
    } catch (error) {
        return json({ error: error.message }, { status: 400 });
    }
}