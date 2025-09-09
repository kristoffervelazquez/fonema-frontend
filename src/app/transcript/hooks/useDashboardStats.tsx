import { useMemo } from 'react';
import type { Transcript } from '../../../api/transcript/interfaces';


export const useDashboardStats = (transcripts?: Transcript[]) => {
  return useMemo(() => {
    if (!transcripts || transcripts.length === 0) {
      return {
        total: 0,
        sentimentCounts: { Positivo: 0, Negativo: 0, Neutral: 0 },
        pieData: [],
        timelineAxisData: { xAxis: [], series: [] },
      };
    }

    const sentimentCounts = transcripts.reduce(
      (acc, curr) => {
        const sentimiento = curr.sentiment.score as keyof typeof acc;
        if (sentimiento === 'Positivo' || sentimiento === 'Negativo' || sentimiento === 'Neutral') {
          acc[sentimiento]++;
        }
        return acc;
      },
      { Positivo: 0, Negativo: 0, Neutral: 0 }
    );

    const pieData = Object.entries(sentimentCounts).map(([label, value], id) => ({
      id,
      value,
      label,
    }));
    
    const timelineGroups = transcripts.reduce((acc, curr) => {
        if (!curr.created_at) {
            return acc;
        }
        const dateObj = new Date(curr.created_at);
        if (isNaN(dateObj.getTime())) {
            return acc;
        }
        const date = dateObj.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
        if (!acc[date]) {
            acc[date] = { date, Positivo: 0, Negativo: 0, Neutral: 0 };
        }
        if (curr.sentiment.score === 'Positivo' || curr.sentiment.score === 'Negativo' || curr.sentiment.score === 'Neutral') {
            acc[date][curr.sentiment.score]++;
        }
        return acc;
    }, {} as Record<string, any>);

    const sortedTimeline = Object.values(timelineGroups).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const timelineAxisData = {
        xAxis: [{ 
            data: sortedTimeline.map(d => d.date), 
            scaleType: 'point' as const
        }],
        series: [
            { data: sortedTimeline.map(d => d.Positivo), label: 'Positivo', color: '#4caf50' },
            { data: sortedTimeline.map(d => d.Negativo), label: 'Negativo', color: '#f44336' },
            { data: sortedTimeline.map(d => d.Neutral), label: 'Neutral', color: '#ffc107' },
        ]
    };

    return { total: transcripts.length, sentimentCounts, pieData, timelineAxisData };
  }, [transcripts]);
};