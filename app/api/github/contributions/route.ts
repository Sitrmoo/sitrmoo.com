import { NextResponse } from "next/server";

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GraphQLResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    };
  };
}

export async function GET() {
  const username = "gbhf0020";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token is not configured" },
      { status: 503 }
    );
  }

  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API responded with status ${res.status}` },
        { status: 502 }
      );
    }

    const json = await res.json() as GraphQLResponse;
    
    // 处理GraphQL返回的业务错误
    if (!json.data?.user) {
      return NextResponse.json(
        { error: "User not found or token invalid" },
        { status: 404 }
      );
    }

    const calendar = json.data.user.contributionsCollection.contributionCalendar;
    
    // 添加颜色映射，让前端可以直接使用
    const weeksWithColors = calendar.weeks.map(week => ({
      contributionDays: week.contributionDays.map(day => ({
        ...day,
        color: getContributionColor(day.contributionCount)
      }))
    }));

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      weeks: weeksWithColors,
    });
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}

// 颜色映射工具函数
function getContributionColor(count: number): string {
  if (count === 0) return "#ebedf0";
  if (count < 5) return "#9be9a8";
  if (count < 10) return "#40c463";
  if (count < 20) return "#30a14e";
  return "#216e39";
}