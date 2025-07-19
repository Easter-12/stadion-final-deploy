<script>
  let statsInput = '';
  let showResults = false;
  let predictionResults = {};
  let isLoading = false;
  let errorMessage = '';

  async function handlePrediction() {
    isLoading = true;
    showResults = false;
    errorMessage = '';
    
    try {
      const stats = parseStats(statsInput);
      const apiUrl = '/api/predict';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }

      predictionResults = await response.json();
      showResults = true;

    } catch (error) {
      errorMessage = error.message;
    } finally {
      isLoading = false;
    }
  }

  function parseStats(text) {
      if (!text) throw new Error("Input is empty."); const teamData = { teamA: {}, teamB: {} }; const lines = text.trim().split('\n'); let currentTeam = null; const statMapping = { 'goal': 'goals', 'loss': 'conceded', 'shot(ot)': 'shotsOnTarget', 'corner': 'corners', 'yellow card': 'yellowCards', 'fouls': 'fouls', 'possession': 'possession' }; lines.forEach(line => { line = line.toLowerCase().trim(); if (line.startsWith('team a:')) { currentTeam = 'teamA'; return; } if (line.startsWith('team b:')) { currentTeam = 'teamB'; return; } if (currentTeam && line.includes(':')) { const parts = line.split(':'); const key = parts[0].trim(); let value = parts[1].trim().replace('%', ''); const statName = statMapping[key]; if (statName) { const numericValue = parseFloat(value); if (!isNaN(numericValue)) { teamData[currentTeam][statName] = numericValue; } } } }); if (Object.keys(teamData.teamA).length < 5 || Object.keys(teamData.teamB).length < 5) { throw new Error("Invalid format. Please ensure both teams have at least 5 stats."); } return teamData;
  }
  
  // THE FULL LIST OF PREDICTIONS
  const predictionMap = [ 
    { key: 'matchWinner', emoji: '🏆', title: 'Match Winner' }, 
    { key: 'correctScore', emoji: '🧮', title: 'Predicted Score' },
    { key: 'btts', emoji: '🤝', title: 'Both Teams to Score' },
    { key: 'corners', emoji: '🚩', title: 'Total Corners' },
    { key: 'fouls', emoji: '🚫', title: 'Fouls Leader' }
  ];
</script>

<svelte:head><title>Predictor | Stadion AI</title></svelte:head>

<div class="page-wrapper">
  <nav class="navbar">
    <a href="/" class="logo">
      <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-2.293 4.293l1.293 1.293-2.293 2.293-1.293-1.293 2.293-2.293zm-3 3l1.293 1.293-2.293 2.293-1.293-1.293 2.293-2.293zM12 10.586l2.293-2.293 1.293 1.293-2.293 2.293-1.293-1.293zm3 3l2.293-2.293 1.293 1.293-2.293 2.293-1.293-1.293zm-3 3.707l-2.293-2.293-1.293 1.293 2.293 2.293 1.293-1.293zm3-3l-2.293-2.293-1.293 1.293 2.293 2.293 1.293-1.293zm3-3l-2.293-2.293-1.293 1.293 2.293 2.293 1.293-1.293z"/></svg>
      <span>Stadion AI</span>
    </a>
  </nav>

  <main class="content">
    <section class="w-full max-w-lg">
      <h1 class="input-title">Prediction Engine</h1>
      <textarea 
        bind:value={statsInput}
        class="input-textarea"
        placeholder="Paste full match statistics here..."></textarea>
      
      <button on:click={handlePrediction} class="predict-button" disabled={isLoading}>
        {#if isLoading}
          <span>Analyzing...</span>
        {:else}
          <span>Generate Analysis</span>
        {/if}
      </button>
    </section>

    {#if errorMessage}
      <div class="error-message">
        <strong>Error:</strong> {errorMessage}
      </div>
    {/if}

    {#if showResults}
      <section class="results-wrapper">
        {#each predictionMap as card}
          {@const prediction = predictionResults[card.key]}
          {#if prediction}
            <div class="result-card">
              <div class="card-header">
                <span class="card-emoji">{card.emoji}</span>
                <div class="card-title-group">
                  <p class="card-title">{card.title}</p>
                  <p class="card-outcome">{prediction.outcome}</p>
                </div>
                <div class="card-confidence">
                  <span class="confidence-value">{prediction.confidence}%</span>
                  <span class="confidence-label">Confidence</span>
                </div>
              </div>
              <p class="card-analysis">{prediction.analysis}</p>
            </div>
          {/if}
        {/each}
      </section>
    {/if}
  </main>
</div>

<style>
  :global(body) { background-color: #f9fafb; font-family: 'Inter', sans-serif; }
  .page-wrapper { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
  .navbar { display: flex; align-items: center; }
  .logo { display: flex; align-items: center; gap: 0.75rem; font-size: 1.25rem; font-weight: 700; color: #111827; text-decoration: none; }
  .content { margin-top: 4rem; display: flex; flex-direction: column; align-items: center; gap: 3rem; }
  
  .input-title { font-size: 2.25rem; font-weight: 800; text-align: center; margin-bottom: 2rem; }
  .input-textarea { width: 100%; height: 16rem; padding: 1rem; box-sizing: border-box; background-color: #ffffff; border: 1px solid #d1d5db; border-radius: 0.75rem; color: #1f2937; font-size: 1rem; resize: none; transition: all 0.2s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
  .input-textarea:focus { outline: none; border-color: #ff3e00; box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.2); }
  .predict-button { width: 100%; margin-top: 1rem; padding: 0.8rem 1rem; font-size: 1.1rem; font-weight: 600; color: white; background-image: linear-gradient(to right, #ff3e00, #ef4444); border-radius: 0.5rem; border: none; cursor: pointer; transition: all 0.2s; }
  .predict-button:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(255, 62, 0, 0.3); }
  .predict-button:disabled { opacity: 0.6; cursor: not-allowed; }

  .error-message { color: #b91c1c; background-color: #fee2e2; padding: 1rem; border-radius: 0.5rem; width: 100%; max-width: 700px; text-align: center; }
  
  .results-wrapper { width: 100%; max-width: 700px; display: flex; flex-direction: column; gap: 1rem; }
  .result-card { background-color: white; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  .card-header { display: flex; align-items: center; gap: 1rem; }
  .card-emoji { font-size: 2.5rem; }
  .card-title-group { flex-grow: 1; }
  .card-title { font-size: 0.8rem; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
  .card-outcome { font-size: 1.25rem; font-weight: 700; }
  .card-confidence { text-align: right; }
  .confidence-value { font-size: 1.75rem; font-weight: 800; color: #111827; }
  .confidence-label { font-size: 0.75rem; color: #6b7280; display: block; margin-top: -0.25rem; }
  .card-analysis { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; font-size: 0.9rem; color: #4b5563; line-height: 1.6; }
</style>