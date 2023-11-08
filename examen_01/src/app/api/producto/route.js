import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
    try {
        const results=await conn.query("SELECT * FROM products");
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            {message:error.message},
            {status:500}
        );
    }
}
export async function POST(request) {
    try {
        const { name, barcode, description, price } = await request.json();
        const result = await conn.query("INSERT INTO products SET ?", {
            name,
            barcode,
            description,
            price
        });
        return NextResponse.json({
            name,
            barcode,
            description,
            price,
            id: result.insertId
        });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}