import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const generateToken=(payload:{email:string | undefined ,role:string | undefined ,id:string | undefined},srcret:string,expiresIn:string)=>{

    const token=jwt.sign(payload,srcret,{algorithm:"HS256",expiresIn});
    return token

}

const varifyToken=(token:string,refeesh_srcret:Secret)=>{

    return jwt.verify(token,refeesh_srcret) as JwtPayload;
}

export const jwtHalpers={
    generateToken,
    varifyToken
}