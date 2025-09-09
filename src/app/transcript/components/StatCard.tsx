import { Card, CardContent, Typography } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export const StatCard = ({ title, value, color = 'inherit' }: StatCardProps) => (
  <Card>
    <CardContent>
      <Typography color="text.secondary" gutterBottom>{title}</Typography>
      <Typography variant="h4" color={color}>{value}</Typography>
    </CardContent>
  </Card>
);