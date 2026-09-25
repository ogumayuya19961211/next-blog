"use server";

import { User } from "@/entities/user";
import { getDataSource } from "./db";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "./jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Post } from "@/entities/post";

export async function signup(
    _prevState: {error: string} | null, 
    formData: FormData
):Promise<{error:string} | null>{
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if(!name || !email || !password){
        return {error: "すべての項目を入力してください。"}
    }
    if(password.length < 6){
        return{error:"パスワードは6文字以上で入力して"}
    }

    const ds = await getDataSource();
    const userRepo = ds.getRepository<User>("User");

    const existing = await userRepo.findOne({where: {email}});

    if(existing){
        return{
            error:"すでに存在するメールアドレスです。"
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({name,email,password:hashedPassword});
    await userRepo.save(user);
    console.log(user);

    const token = generateToken({id: user.id, name: user.name});
    const cookieStore = await cookies();
    cookieStore.set("token",token,{
        httpOnly: true,
        path:"/",
        maxAge: 60 * 60 * 24 * 7,
    });
    redirect('/');
}

export async function signin(
    _prevState: {error: string} | null, 
    formData: FormData
):Promise<{error:string} | null> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if( !email || !password){
        return {error: "すべての項目を入力してください。"}
    }
    const ds = await getDataSource();
    const userRepo = ds.getRepository<User>("User");

    const user = await userRepo.findOne({where: {email}});

    if(!user || !(await bcrypt.compare(password,user.password))){
        return{
            error:"メールアドレスかパスワードが正しくないです。"
        };
    }
    const token = generateToken({id: user.id, name: user.name});
    const cookieStore = await cookies();
    cookieStore.set("token",token,{
        httpOnly: true,
        path:"/",
        maxAge: 60 * 60 * 24 * 7,
    });
    console.log(user);
    redirect('/');
}

export async function createPost(
    _prevState: {error: string} | null, 
    formData: FormData
):Promise<{error:string} | null> {
    const cookieStore =  await cookies();
    const token = cookieStore.get('token')?.value;
    const user = verifyToken(token);

    if(!user) redirect('/auth/signin');

    const title = (formData.get('title') as string)?.trim();
    const content = (formData.get('content') as string)?.trim();
    const published = formData.get("published") === 'true';

    if(!title || !content){
        return{error: "タイトルと本文を入力してください。"}
    }

    const ds = await getDataSource();
    const postRepo = ds.getRepository<Post>("Post");
    const post = postRepo.create({title, content, published, userId: user.id});
    await postRepo.save(post);
    console.log(post);

    redirect('/dashboard');
}

export async function updatePost(
    postId: number, 
    _prevState: {error:string} | null,
    formData: FormData,    
) :Promise<{error: string} | null>
{
    const cookeStore = await cookies();
    const token = cookeStore.get('token')?.value;
    const user = verifyToken(token);
    if(!user) redirect('/auth/signin');

    const title = (formData.get('title') as string)?.trim();
    const content = (formData.get('content') as string)?.trim();
    const published = (formData.get('published'))=== 'true';

    if(!title || !content){
        return {error: `タイトルと本文を入力してください。`}
    }

    const ds = await getDataSource();
    const postRepo = ds.getRepository<Post>("Post");

    const post = await postRepo.findOne({
        where: {id: postId, userId:user.id}
    });

    if(!post) return {error: '記事が見つかりません。'}

    await postRepo.update(postId,{title,content,published});
    
    redirect('/dashboard');
}

export async function postDelete(postId: number) {
    const cookeStore = await cookies();
    const token = cookeStore.get('token')?.value;
    const user = verifyToken(token);
    if(!user) redirect('/auth/signin');

    const ds = await getDataSource();
    const postRepo = ds.getRepository<Post>("Post");

    const post = postRepo.findOne({
        where: {id: postId, userId:user.id}
    });

    if(!post) return;
    
    await postRepo.delete({id: postId});

    redirect('/dashboard');
    
}

export async function siginout() {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    redirect('/');
}