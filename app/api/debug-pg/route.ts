export async function GET() {
  try {
    const resolved = require.resolve('pg');
    const fs = require('fs');
    const path = require('path');
    const dir = path.dirname(resolved);
    const files = fs.readdirSync(dir);
    return Response.json({ ok: true, resolved, dir, files });
  } catch (e: any) {
    return Response.json(
      { ok: false, message: e?.message, code: e?.code, stack: e?.stack },
      { status: 500 }
    );
  }
}
