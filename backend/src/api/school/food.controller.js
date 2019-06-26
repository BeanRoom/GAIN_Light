// node-school-kr : 전국의 급식을 파싱해와주는 모듈 패키지
import MealParser from 'node-school-kr';


export const DefaultMeal = async (ctx) => {

    const today = new Date();
    // node-school-kr 패키지의 객체를 생성
    const GSM = new MealParser();
    // 고등학교, 광주광역시, 광주소프트웨어마이스터고등학교로 객체 초기화
    GSM.init(MealParser.Type.HIGH, MealParser.Region.GWANGJU, 'F100000120');

    // 이번달 급식을 받아옴
    const meal = await GSM.getMeal(today.getFullYear(), today.getMonth()+1);

    // getMeal()을 통해 받아온 json 데이터 중 날짜를 제외한 필요 없는 데이터를 모두 지움.
    delete meal.year;
    delete meal.month;
    delete meal.day;
    delete meal.today;

    // 급식 내용에 담겨 있는 필요 없는 문자열을 지워줌.
    for(var key in meal){
        
        // 정규식을 이용하여 문자열을 나눠주는 모습
        // 기존 getMeal을 통해서 데이터를 가져오면, 아침, 점심, 저녁이 [조식]~[중식]~[석식]과 같이 나눠진 점을 이용하였음
        // 괄호와 그 안에 한글이 있는 경우에 문자열을 분리해주어 아침, 점심, 저녁을 분리함
        // 모든 한글을 정규식에서 표현하려면 밑과 같이 ㄱ-ㅎ|ㅏ-ㅣ|가-힣 으로 표기해줌.
        meal[key] = meal[key].split(/\[[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*\]/);

        // 분리할 때에 아침이 분리되며 배열의 0번에 빈 공백이 생기는데, 이를 삭제해줌.
        meal[key].splice(0, 1);

        // 급식 메뉴의 처음에 \n이 들어가는데, replace가 한번만 삭제한다는 점을 이용하여 처음 \n을 없애줌.
        // 각 급식 메뉴에서 *, 숫자, . 등 필요없는 텍스트들을 없애줌.
        // 정규식의 마지막 슬래쉬 뒤에 gi를 붙이면 해당하는 모든 경우를 찾아서 없애줌.
        for(var index in meal[key]){
        
            meal[key][index] = meal[key][index].replace("\n", '');
            meal[key][index] = meal[key][index].replace(/[0-9|.|\*]/gi, '');
        }
    }

    ctx.body = meal;
}

export const SelectMeal = async (ctx) => {


    // node-school-kr 패키지의 객체를 생성
    const GSM = new MealParser();
    // 고등학교, 광주광역시, 광주소프트웨어마이스터고등학교로 객체 초기화
    GSM.init(MealParser.Type.HIGH, MealParser.Region.GWANGJU, 'F100000120');

    // 이번달 급식을 받아옴
    const meal = await GSM.getMeal(ctx.request.body.year, ctx.request.body.month);

    // getMeal()을 통해 받아온 json 데이터 중 날짜를 제외한 필요 없는 데이터를 모두 지움.
    delete meal.year;
    delete meal.month;
    delete meal.day;
    delete meal.today;

    // 급식 내용에 담겨 있는 필요 없는 문자열을 지워줌.
    for(var key in meal){
        
        // 정규식을 이용하여 문자열을 나눠주는 모습
        // 기존 getMeal을 통해서 데이터를 가져오면, 아침, 점심, 저녁이 [조식]~[중식]~[석식]과 같이 나눠진 점을 이용하였음
        // 괄호와 그 안에 한글이 있는 경우에 문자열을 분리해주어 아침, 점심, 저녁을 분리함
        // 모든 한글을 정규식에서 표현하려면 밑과 같이 ㄱ-ㅎ|ㅏ-ㅣ|가-힣 으로 표기해줌.
        meal[key] = meal[key].split(/\[[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*\]/);

        // 분리할 때에 아침이 분리되며 배열의 0번에 빈 공백이 생기는데, 이를 삭제해줌.
        meal[key].splice(0, 1);

        // 급식 메뉴의 처음에 \n이 들어가는데, replace가 한번만 삭제한다는 점을 이용하여 처음 \n을 없애줌.
        // 각 급식 메뉴에서 *, 숫자, . 등 필요없는 텍스트들을 없애줌.
        // 정규식의 마지막 슬래쉬 뒤에 gi를 붙이면 해당하는 모든 경우를 찾아서 없애줌.
        for(var index in meal[key]){
        
            meal[key][index] = meal[key][index].replace("\n", '');
            meal[key][index] = meal[key][index].replace(/[0-9|.|\*]/gi, '');
        }
    }

    ctx.body = meal;
}