import jwt from 'jsonwebtoken';
export interface JwtPayload{
    id: number;
    name: string;
}

const JWT_SECRET = process.env.JWT_SECRET ?? "next-blog-dev-secret";

export function generateToken(payload: JwtPayload): string{
    return jwt.sign(payload, JWT_SECRET,{expiresIn: '7d'});
}

export function verifyToken(token: string | undefined):JwtPayload | null{
    if(!token) return null;
    
    try{
        const  decoded = jwt.verify(token, JWT_SECRET);
        if(typeof decoded === "object" && "id" in decoded && "name" in decoded){
            return {id:decoded.id as number, name:decoded.name as string}
        }
        return null;        
    }catch(error){
        return null;
    }
}