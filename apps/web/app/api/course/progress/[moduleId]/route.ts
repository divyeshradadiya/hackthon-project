import { auth } from '@clerk/nextjs/server';
import { updateModuleProgress, getModuleProgress } from '@repo/database';
import { NextResponse } from 'next/server';

// Helper to extract moduleId from the URL path
function getModuleIdFromPath(request: Request): string | null {
    const url = new URL(request.url);
    const parts = url.pathname.split('/');
    const moduleId = parts[parts.length - 1] || null;
    return moduleId;
}

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const moduleId = getModuleIdFromPath(request);
        if (!moduleId) {
            return new NextResponse('Module ID not found', { status: 400 });
        }

        const body = await request.json();
        const { completed } = body;

        const progress = await updateModuleProgress(moduleId, userId, completed);
        return NextResponse.json(progress);
    } catch (error) {
        console.error('[MODULE_PROGRESS_UPDATE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const moduleId = getModuleIdFromPath(request);
        if (!moduleId) {
            return new NextResponse('Module ID not found', { status: 400 });
        }

        const progress = await getModuleProgress(moduleId, userId);
        return NextResponse.json(progress);
    } catch (error) {
        console.error('[MODULE_PROGRESS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
