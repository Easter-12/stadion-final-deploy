<script>
  // This page is purely for presentation.
</script>

<svelte:head>
  <title>Stadion AI - The Future of Football Analysis</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</svelte:head>

<div class="page-wrapper">
  <nav class="navbar">
    <div class="logo">
      <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-2.293 4.293l1.293 1.293-2.293 2.293-1.293-1.293 2.293-2.293zm-3 3l1.293 1.293-2.293 2.293-1.293-1.293 2.293-2.293zM12 10.586l2.293-2.293 1.293 1.293-2.293 2.293-1.293-1.293zm3 3l2.293-2.293 1.293 1.293-2.293 2.293-1.293-1.293zm-3 3.707l-2.293-2.293-1.293 1.293 2.293 2.293 1.293-1.293zm3-3l-2.293-2.293-1.293 1.293 2.293 2.293 1.293-1.293zm3-3l-2.293-2.293-1.293 1.293 2.293 2.293 1.293-1.293z"/></svg>
      <span>Stadion AI</span>
    </div>
    <a href="/predictor" class="launch-button">Launch Predictor</a>
  </nav>

  <main class="content">
    <section class="hero">
      <h1 class="hero-title">Beyond Guesswork. <br> <span class="gradient-text">Pure Analysis.</span></h1>
      <p class="hero-subtitle">Our advanced engine analyzes dozens of statistical factors to provide not just predictions, but actionable insights into why one team has the edge.</p>
      <a href="/predictor" class="hero-cta">Get Started for Free</a>
    </section>

    <section class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">📊</div>
        <h3 class="feature-title">In-Depth Stat Parsing</h3>
        <p class="feature-description">From possession to discipline, our tool understands the nuances of the game.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🧠</div>
        <h3 class="feature-title">Intelligent Analysis</h3>
        <p class="feature-description">Receive justifications for each prediction, understanding the 'why' behind the outcome.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h3 class="feature-title">High-Confidence Scoring</h3>
        <p class="feature-description">Our confidence scores are weighted by the most impactful performance indicators.</p>
      </div>
    </section>
  </main>
</div>

<style>
  :global(body) { font-family: 'Inter', sans-serif; background-color: #ffffff; color: #111827; } .page-wrapper { max-width: 1200px; margin: 0 auto; padding: 1.5rem; } .navbar { display: flex; justify-content: space-between; align-items: center; } .logo { display: flex; align-items: center; gap: 0.75rem; font-size: 1.5rem; font-weight: 800; color: #1f2937; } .launch-button { background-color: #f3f4f6; color: #1f2937; font-weight: 600; padding: 0.6rem 1.2rem; border-radius: 999px; text-decoration: none; transition: background-color 0.2s; } .launch-button:hover { background-color: #e5e7eb; } .hero { text-align: center; padding: 6rem 0; } .hero-title { font-size: 4rem; font-weight: 900; letter-spacing: -0.05em; line-height: 1.1; color: #111827; } .gradient-text { background-image: linear-gradient(to right, #ff3e00, #ef4444); -webkit-background-clip: text; background-clip: text; color: transparent; } .hero-subtitle { margin-top: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto; font-size: 1.25rem; color: #4b5563; line-height: 1.6; } .hero-cta { display: inline-block; margin-top: 2.5rem; background-image: linear-gradient(to right, #ff3e00, #ef4444); color: white; font-size: 1.125rem; font-weight: 700; padding: 1rem 2.5rem; border-radius: 999px; text-decoration: none; transition: transform 0.2s; } .hero-cta:hover { transform: scale(1.05); } .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; } .feature-card { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 2rem; } .feature-icon { font-size: 2.5rem; margin-bottom: 1rem; } .feature-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; } .feature-description { color: #6b7280; line-height: 1.6; }
</style>