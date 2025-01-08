import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

const revenueData = [
  { name: 'Jan', value: 65000 },
  { name: 'Feb', value: 72000 },
  { name: 'Mar', value: 85000 },
  { name: 'Apr', value: 78000 },
  { name: 'May', value: 92000 },
  { name: 'Jun', value: 110000 },
];

const categoryData = [
  { name: 'Marketing', value: 45 },
  { name: 'Technology', value: 35 },
  { name: 'Health', value: 28 },
  { name: 'Finance', value: 25 },
  { name: 'Lifestyle', value: 20 },
];

export default function Analytics() {
  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Track your performance metrics
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ChartContainer config={{}}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#0D9488"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ChartContainer>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}