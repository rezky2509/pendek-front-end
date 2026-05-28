// App Route Definition for Logging out
// import { NextResponse } from "next/server";
import { logoutUser } from "@/app/services/api";


// export async function logout(){
//     console.log('Function Called')
// }

import { NextResponse } from 'next/server';

export async function GET() {
  const result = await logoutUser() as boolean
  if(result == true){
    return NextResponse.redirect('/login')
  }
}

// export async function DELETE(){
  
// }


// Example of Post Request  
// export async function POST(request: Request) {
//   const body = await request.json();
//   return NextResponse.json({ received: body }, { status: 201 });
// }