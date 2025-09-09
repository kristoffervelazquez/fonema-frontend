import { Box, Card, CardContent, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts'

interface Props {
  timelineAxisData: {
    xAxis: {
      data: any[];
      scaleType: "point";
    }[];
    series: {
      data: any[];
      label: string;
      color: string;
    }[];
  }
}

const SentimentTimeLineChart = ({ timelineAxisData }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Sentimiento a lo Largo del Tiempo</Typography>
        <Box sx={{ height: { xs: 250, md: 300 } }}>
          <LineChart
            xAxis={timelineAxisData.xAxis}
            series={timelineAxisData.series}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default SentimentTimeLineChart