import { RIASEC_QUESTIONS, BIG_FIVE_QUESTIONS, WORK_VALUES_ITEMS, HOLLAND_CAREER_MAP } from '../data/psychometricData';

export const psychometricScoringService = {
  /**
   * Calculate RIASEC Holland Code
   * @param {Object} answers - { questionId: ratingValue (1-5) }
   */
  calculateRIASEC(answers = {}) {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    RIASEC_QUESTIONS.forEach(q => {
      const rating = parseInt(answers[q.id]) || 3;
      scores[q.category] += rating;
      counts[q.category] += 1;
    });

    const averages = {
      R: parseFloat((scores.R / (counts.R || 1)).toFixed(2)),
      I: parseFloat((scores.I / (counts.I || 1)).toFixed(2)),
      A: parseFloat((scores.A / (counts.A || 1)).toFixed(2)),
      S: parseFloat((scores.S / (counts.S || 1)).toFixed(2)),
      E: parseFloat((scores.E / (counts.E || 1)).toFixed(2)),
      C: parseFloat((scores.C / (counts.C || 1)).toFixed(2))
    };

    // Sort categories from highest average to lowest
    const sortedCategories = Object.entries(averages)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    const hollandCode = sortedCategories.slice(0, 3).join('');

    // Look up matching O*NET career profile
    const mappedCareer = HOLLAND_CAREER_MAP[hollandCode] || HOLLAND_CAREER_MAP['DEFAULT'];

    return {
      averages,
      sortedCategories,
      hollandCode,
      mappedCareer,
      primaryInterest: sortedCategories[0],
      secondaryInterest: sortedCategories[1],
      tertiaryInterest: sortedCategories[2]
    };
  },

  /**
   * Calculate Big Five Personality Traits (IPIP-NEO)
   * @param {Object} answers - { questionId: ratingValue (1-5) }
   */
  calculateBigFive(answers = {}) {
    const traitScores = {
      Extraversion: 0,
      Agreeableness: 0,
      Conscientiousness: 0,
      EmotionalStability: 0,
      Openness: 0
    };

    const traitCounts = {
      Extraversion: 0,
      Agreeableness: 0,
      Conscientiousness: 0,
      EmotionalStability: 0,
      Openness: 0
    };

    BIG_FIVE_QUESTIONS.forEach(q => {
      let val = parseInt(answers[q.id]) || 3;
      if (q.isReverse) {
        val = 6 - val; // Standard Likert 1-5 reverse scoring formula
      }
      traitScores[q.trait] += val;
      traitCounts[q.trait] += 1;
    });

    const percentiles = {};
    const insights = [];

    Object.keys(traitScores).forEach(trait => {
      const count = traitCounts[trait] || 4;
      const maxPossible = count * 5;
      const minPossible = count * 1;
      const score = traitScores[trait];
      
      // Calculate percentage score
      const pct = Math.round(((score - minPossible) / (maxPossible - minPossible)) * 100);
      percentiles[trait] = pct;
    });

    // Workplace & Career Fit Insights based on Big Five Percentiles
    if (percentiles.Conscientiousness >= 70) {
      insights.push("High Conscientiousness: Exceptional attention to detail, reliability, and project execution. Fits engineering, finance, law, research, and technical systems.");
    }
    if (percentiles.Extraversion >= 70) {
      insights.push("High Extraversion: Thrives in high-energy, collaborative, and public-facing environments. Fits sales leadership, marketing, management consultancy, and student outreach.");
    }
    if (percentiles.Openness >= 70) {
      insights.push("High Openness: Strong appetite for innovation, abstract thinking, and creative problem solving. Fits UX design, R&D, artificial intelligence research, and strategy.");
    }
    if (percentiles.Agreeableness >= 70) {
      insights.push("High Agreeableness: Compassionate team player and empathetic communicator. Fits healthcare, educational counselling, teaching, and human resources.");
    }
    if (percentiles.EmotionalStability >= 70) {
      insights.push("High Emotional Stability: Exceptionally calm under pressure and resilient during unexpected setbacks. Fits executive management, surgical fields, and entrepreneurship.");
    }

    return {
      percentiles,
      insights,
      completedDate: new Date().toISOString().split('T')[0]
    };
  },

  /**
   * Calculate Work Values Forced-Choice Profile
   * @param {Array} top5Ids - Array of 5 item IDs selected as Non-Negotiable
   * @param {Array} bottom3Ids - Array of 3 item IDs selected as Least Important
   */
  calculateWorkValues(top5Ids = [], bottom3Ids = []) {
    const top5Items = WORK_VALUES_ITEMS.filter(item => top5Ids.includes(item.id));
    const bottom3Items = WORK_VALUES_ITEMS.filter(item => bottom3Ids.includes(item.id));

    // Environmental Alignment Summary
    let environmentalFit = "Balanced Professional Environment";
    if (top5Ids.includes('v1') || top5Ids.includes('v14')) {
      environmentalFit = "Autonomous & Entrepreneurial Track (High independence & initiative)";
    } else if (top5Ids.includes('v2') || top5Ids.includes('v7')) {
      environmentalFit = "Corporate & High-Growth Enterprise Track (High compensation & status)";
    } else if (top5Ids.includes('v5') || top5Ids.includes('v19')) {
      environmentalFit = "Purpose-Driven & Social Impact Track (NGOs, Healthcare, Policy, Public Sector)";
    } else if (top5Ids.includes('v3') || top5Ids.includes('v13')) {
      environmentalFit = "Structured & Stable Corporate / Public Service Track";
    }

    return {
      top5Items,
      bottom3Items,
      environmentalFit,
      completedDate: new Date().toISOString().split('T')[0]
    };
  }
};
