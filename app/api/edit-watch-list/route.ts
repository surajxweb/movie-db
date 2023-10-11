import { NextResponse } from "next/server";
import { GraphQLClient } from "graphql-request"; // Import GraphQLClient

export async function POST(request: Request) {
  const requestData = await request.json();
  // if (!requestData || !requestData.cart || !isCartsValid(requestData.cart)) {
  //   return "Error with Cart Value. Something seems fishy!";
  // }

  const type = requestData.type;
  const clerkUserId = requestData.clerkUserId;
  const list = requestData.list;
  console.log("mutation ke liye list hai: ", list);

  // Define your GraphQL query as a string
  const movieQuery = `
  mutation updateUserTvWishList {
    updateCinefreek(
      where: {clerkUserId: "${clerkUserId}"}, 
      data: {
        movieWishList:${JSON.stringify(list)},
      }
    ) {
      id
      tvWishList
      movieWishList
    }
  }
  `;

  const tvQuery = `
  mutation updateUserTvWishList {
    updateCinefreek(
      where: {clerkUserId: "${clerkUserId}"}, 
      data: {
        tvWishList:${JSON.stringify(list)},
      }
    ) {
        userName
        tvWishList
        movieWishList
    }
  }
  `;

  // Create a GraphQL client instance
  const client = new GraphQLClient(process.env.GPAPHQL_KA_CHAABI || ""); // Replace with your GraphQL API endpoint

  try {
    const data = await client.request(type === 2 ? tvQuery : movieQuery);

    // You can access the response data in the `data` variable
    return NextResponse.json({ movieList: data });
  } catch (error) {
    console.error("GraphQL request error:", error);

    return NextResponse.error();
  }
}
