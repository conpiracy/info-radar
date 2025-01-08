import { PageContainer } from "../components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { BookOpen, MessageSquare, Share2, Target } from "lucide-react";

const trainingModules = [
  {
    title: "Traffic Generation",
    description: "Learn proven strategies to drive targeted traffic",
    icon: Target,
    lessons: ["Social Media Marketing", "SEO Fundamentals", "Paid Advertising"],
  },
  {
    title: "Funnel Optimization",
    description: "Create high-converting sales funnels",
    icon: Share2,
    lessons: ["Landing Page Design", "Email Sequences", "Upsell Strategies"],
  },
  {
    title: "Content Creation",
    description: "Produce engaging content that converts",
    icon: BookOpen,
    lessons: ["Copywriting Basics", "Video Production", "Social Posts"],
  },
  {
    title: "Community Building",
    description: "Build and nurture your audience",
    icon: MessageSquare,
    lessons: ["Engagement Tactics", "Community Management", "Brand Building"],
  },
];

export default function Training() {
  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl font-bold">Training Center</h1>
          <p className="text-muted-foreground mt-2">
            Master the art of info product marketing
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {trainingModules.map((module) => {
            const Icon = module.icon;
            return (
              <Card key={module.title} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle>{module.title}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {module.lessons.map((lesson) => (
                      <li
                        key={lesson}
                        className="flex items-center gap-2 text-sm hover:text-primary cursor-pointer transition-colors"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}