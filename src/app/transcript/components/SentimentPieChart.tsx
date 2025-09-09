import { Card, CardContent, Typography, Box } from '@mui/material'
import { PieChart } from '@mui/x-charts'

interface Props {
  pieData: {
    id: number;
    value: number;
    label: string;
  }[]
}

const SentimentPieChart = ({ pieData }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Distribución de Sentimiento</Typography>
        <Box sx={{ height: { xs: 250, md: 300 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <PieChart
            series={[
              {
                data: pieData.map((item) => ({
                  ...item,
                  value: typeof item.value === 'number' ? item.value : 0,
                })),
                highlightScope: { fade: 'series', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' } as any,
                innerRadius: 30,
                paddingAngle: 2,
                cornerRadius: 5,
              },
            ]}
            height={200}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default SentimentPieChart