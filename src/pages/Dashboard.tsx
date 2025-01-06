import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, TrendingUp, Users, Zap } from "lucide-react";

const topOffers = [
  {
    title: "Digital Marketing Mastery",
    revenue: "$125,000",
    growth: "+12.5%",
    affiliates: 45,
    category: "Marketing",
  },
  {
    title: "AI Business Automation",
    revenue: "$98,000",
    growth: "+28.2%",
    affiliates: 32,
    category: "Technology",
  },
  {
    title: "Social Media Influence",
    revenue: "$87,500",
    growth: "+15.7%",
    affiliates: 38,
    category: "Social Media",
  },
];

export default function Dashboard() {
  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Your info product analytics at a glance
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$310.5k</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Affiliates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">115</div>
              <p className="text-xs text-muted-foreground">
                +8 new this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">
                +0.5% improvement
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topOffers.map((offer) => (
                <div
                  key={offer.title}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{offer.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {offer.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{offer.revenue}</p>
                      <p className="text-sm text-green-500">{offer.growth}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{offer.affiliates}</p>
                      <p className="text-sm text-muted-foreground">affiliates</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}