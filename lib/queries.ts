import { Post } from "@/entities/post";
import { getDataSource } from "./db";
import { FindOptionsWhere } from "typeorm";
import { cookies } from "next/headers";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { verify } from "crypto";
import { verifyToken } from "./jwt";
import { redirect } from "next/navigation";

export async function getPost(options:{page?: number; limit?: number, isOwn?: boolean}){
    const {page = 1, limit = 2, isOwn = false} = options;
    const ds = await getDataSource();
    const postRepo = ds.getRepository<Post>("Post");

    let where : FindOptionsWhere<Post> = {published: true};

    if(isOwn){
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        const user = verifyToken(token);
        if(!user){
            redirect("/auth/sigin")
        }
        where = {userId: user.id};
    }


    const [posts, total] = await postRepo.findAndCount({
        where,
        relations: {user: true},
        order:{createdAt: 'DESC'},
        skip: (page - 1) * limit,
        take: limit,    
    });

    return { posts, total, page, totalPages: Math.ceil(total / limit)};
}

export async function getPostById(id:number) {
    const ds = await getDataSource();
    const postRepo = ds.getRepository<Post>("Post");

    const post = await postRepo.findOne({
        where: {id: id},
        relations: {user: true},
    });

    if(!post) return null;  
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = verifyToken(token);

    if(!user || user.id !== post.userId){
        if(!post.published) return null;
    }
    return post;
}