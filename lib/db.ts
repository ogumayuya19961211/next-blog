import "reflect-metadata";
import { Post } from "@/entities/post";
import { User } from "@/entities/user";
import { DataSource } from "typeorm";

const globalForTypeoram = global as unknown as {
    dataSource: DataSource | undefined;    
}

export const AppDataSource = 
  globalForTypeoram.dataSource ??
  new DataSource({
    type: 'postgres',
    url:process.env.DATABASE_URL,    
    synchronize: true,
    logging:false,
    entities: [User,Post],
    ssl: {rejectUnauthorized: false},
  });

  if(process.env.NODE_ENV !== 'production'){
    globalForTypeoram.dataSource = AppDataSource;
  }

  export async function getDataSource():Promise<DataSource> {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }
    return AppDataSource;    
  }