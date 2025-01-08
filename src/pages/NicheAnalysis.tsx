import { PageContainer } from "../components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const niches = [
  {
    name: "Digital Marketing",
    avgRating: 4.5,
    commonTraits: [
      "Step-by-step implementation",
      "Case studies included",
      "Regular updates",
    ],
    commonIssues: [
      "Too theoretical",
      "Outdated strategies",
      "Lack of support",
    ],
  },
  {
    name: "Personal Development",
    avgRating: 4.3,
    commonTraits: [
      "Actionable exercises",
      "Community support",
      "Expert interviews",
    ],
    commonIssues: [
      "Generic advice",
      "Limited personalization",
      "High price point",
    ],
  },
];

export default function NicheAnalysis() {
  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl font-bold">Niche Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Deep insights into different market segments
          </p>
        </div>

        <Tabs defaultValue={niches[0].name.toLowerCase().replace(" ", "-")}>
          <TabsList>
            {niches.map((niche) => (
              <TabsTrigger
                key={niche.name}
                value={niche.name.toLowerCase().replace(" ", "-")}
              >
                {niche.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {niches.map((niche) => (
            <TabsContent
              key={niche.name}
              value={niche.name.toLowerCase().replace(" ", "-")}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Common Success Traits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {niche.commonTraits.map((trait) => (
                        <li
                          key={trait}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="h-2 w-2 rounded-full bg-primary" />
                          {trait}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Common Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {niche.commonIssues.map((issue) => (
                        <li
                          key={issue}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="h-2 w-2 rounded-full bg-destructive" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageContainer>
  );
}