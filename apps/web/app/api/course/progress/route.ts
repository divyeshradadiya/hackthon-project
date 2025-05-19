import { auth } from '@clerk/nextjs/server';
import { getUserProgressStats } from '@repo/database';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const progress = await getUserProgressStats(userId);
        return NextResponse.json(progress);
    } catch (error) {
        console.error('[USER_PROGRESS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
