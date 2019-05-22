import Joi from 'joi';
import crypto from 'crypto';
import { account, student, teacher, guest } from '../../models';
import { generateToken }from '../../lib/token.js'
// .env 파일의 환경 변수 불러오기
import dotenv from 'dotenv';
dotenv.config();

// post로 받은 authCode의 값에 따라서 권한을 설정해주기 위한 함수( 0은 학생, 1은 선생님, 2는 게스트 )
const authorizeUser = (authCode) => {
    
    if(authCode == process.env.studentCode)
        return 0;
    else if(authCode == process.env.teacherCode)
        return 1;
    else if(authCode == process.env.guestCode)
        return 2;
    else return 3;
}



// 회원가입 함수 ( auth의 index를 보면 /register 라는 URI로 들어왔을 때 처리하는 함수라는 것을 알 수 있음.)
export const Register = async (ctx) => {
    
    // Joi 라이브러리를 활용해서 형식을 검사하기 위해 객체를 하나 만들어 줌.
    // 왼쪽의 각 name에 해당하는 값의 요구조건임을 알 수 있다.
    // id를 예시로 들자면 '형식은 string이고, 입력 가능한 것은 alphanum( a-z, A-Z, 0-9 )이고, 최소 6글자 최대 30글자, 무조건 입력되야한다'라는 것을 알 수 있다.
    const Registeration = Joi.object().keys({
        id : Joi.string().alphanum().min(5).max(50).required(),
        password : Joi.string().min(5).max(50).required(),
        authCode : Joi.string().alphanum().required()  
    });

    // 위에서 만든 Joi 객체를 이용해서 사용자가 입력한 정보(ctx.request.body)와 비교한다.
    const firstResult = Joi.validate(ctx.request.body, Registeration);

    // 비교한 뒤 만약 에러가 발생한다면 400 에러코드를 전송하고, body에 001 이라는 내용(우리끼리의 오류 코드 약속)을 담아 joi 오류임을 알려줌
    if(firstResult.error) {
        console.log("Register - Joi 형식 에러")
        ctx.status = 400;
        ctx.body = {
            "error" : "001"
        }
        return;
    }

    // 아이디 중복체크
    // 사용자가 입력한 id와 동일한 id가 데이터베이스에 있는지 검사하고, 만약 있다면 exist에 저장함
    const exist = await account.findAll({
        where: {
            id : ctx.request.body.id
        }
    });

    // exist의 길이가 0이 아니라면, 중복된 아이디가 있다는 뜻
    // 따라서 만약 중복된 아이디가 있다면, 400 에러코드를 전송하고, body에 002라는 내용을 담아서 보냄
    if(exist.length){
        console.log(`Register - 이미 존재하는 아이디입니다. / 입력된 아이디 : ${ctx.request.body.id}`);

        ctx.status = 400;
        ctx.body = {
            "error" : "002"
        }
        return;
    }

    // 데이터베이스에 저장할 내용을 정리하는 코드
    const id = ctx.request.body.id;

    // 비밀번호를 crypto 모듈을 이용해서 암호화해줌.
    const password = ctx.request.body.password;
    const password2 = crypto.createHmac('sha256', process.env.Password_KEY).update(password).digest('hex');
    
    // userCode는 U0001 과 같은 5글자로 표현되는데, 이를 위해서 account 테이블의 모든 데이터를 받아온 후, length로 갯수를 셈.
    // 그 후 for문으로 부족한 0 갯수를 채워주고, 맨 앞에 U를 붙임
    const users = await account.findAll();
    let userCode = (users.length+1).toString();

    for(var i=0;userCode.length<4;i++){
        userCode = "0" + userCode;
    }

    userCode = "U" + userCode;

    // 사용자가 입력한 코드와 설정한 코드가 일치하는 지 확인하고, 값을 보내줌
    const auth = authorizeUser(ctx.request.body.authCode);

    // 만약 auth가 3이라면 지정하지 않은 유저코드이므로, 회원가입을 못 하게끔 함
    if(auth == 3){
        console.log(`Register - 존재하지 않는 유저코드입니다. / 입력된 유저코드 : ${ctx.request.body.authCode}`);

        ctx.status = 400;
        ctx.body = {
            "error" : "003"
        }
        return;
    }

    // 입력된 데이터에 대한 로그를 한번 찍어봄
    console.log(`ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\nid 값 : ${id}\npassword 값 : ${password}\nhash 값 : ${password2}\nuserCode 값 : ${userCode}\nauth 값 : ${auth}\nㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ`);
    
    // 데이터베이스에 값을 저장함.
    account.create({
        id : id,
        password : password2,
        userCode : userCode,
        auth : auth
    });

    console.log(`새로운 회원이 저장되었습니다. / 아이디 : ${id}`);

    ctx.body = "성공하였습니다.";

    const payload = {
        id : id,
        userCode : userCode,
        auth : auth
    };

    let token = null;
    token = await generateToken(payload);

    console.log(token);

    ctx.body = {
        token : token
    };
}

export const Login = async (ctx) => {
    
    // Joi 라이브러리를 활용해서 형식을 검사하기 위해 객체를 하나 만들어 줌.
    const LoginInput = Joi.object().keys({
        id : Joi.string().alphanum().min(5).max(50).required(),
        password : Joi.string().min(5).max(50).required(),  
    });

    // 넘어온 body의 형식을 검사한다.
    const Result = Joi.validate(ctx.request.body, LoginInput);

    // 만약 형식이 불일치한다면, 그 이후 문장도 실행하지 않는다.
    if(Result.error) {
        console.log(`Login - Joi 형식 에러`);
        ctx.status = 400;
        ctx.body = {
            "error" : "001"
        }
        return;
    }

    // 데이터베이스에 해당하는 아이디가 있는지 검사합니다.
    const founded = await account.findAll({
        where: {
            id : ctx.request.body.id
        }
    });

    if(!founded.length){
        console.log(`Login - 존재하지 않는 계정입니다. / 입력된 아이디 : ${ctx.request.body.id}`);
        ctx.status = 400;
        ctx.body = {
            "error" : "004"
        }
        return;
    }

    const input = crypto.createHmac('sha256', process.env.Password_KEY).update(ctx.request.body.password).digest('hex');

    if(founded[0].password != input){
        console.log(`Login - 비밀번호를 틀렸습니다.`);
        ctx.status = 400;
        ctx.body = {
            "error" : "005"
        }
        return;
    }

    const payload = {
        id : founded[0].id,
        userCode : founded[0].userCode,
        auth : founded[0].auth
    };

    let token = null;
    token = await generateToken(payload);

    console.log(token);

    ctx.body = {
        token : token
    };

    console.log(`로그인에 성공하였습니다.`)
}