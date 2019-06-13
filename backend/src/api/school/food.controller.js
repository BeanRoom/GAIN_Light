// node-school-kr : 전국의 급식을 파싱해와주는 모듈 패키지
import MealParser from 'node-school-kr';


export const DefaultMeal = async (ctx) => {

    const today = new Date();
    // node-school-kr 패키지의 객체를 생성
    const GSM = new MealParser();
    // 고등학교, 광주광역시, 광주소프트웨어마이스터고등학교로 객체 초기화
    GSM.init(School.Type.HIGH, School.Region.GWANGJU, 'F100000120');

    // 이번달 급식을 받아옴
    const meal = await GSM.getMeal(today.getFullYear(), today.getMonth()+1);

    // getMeal()을 통해 받아온 json 데이터 중 날짜를 제외한 필요 없는 데이터를 모두 지움.
    delete meal.year;
    delete meal.month;
    delete meal.day;
    delete meal.today;

    // 급식 내용에 담겨 있는 필요 없는 문자열을 지워줌.
    for(key in meal){
        meal[key] = meal[key].split(/\[[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*\]/);
        meal[key].splice(0, 1);

        for(index in meal[key]){
            meal[key][index] = meal[key][index].replace(/[0-9|.|\*]/gi, '');
        }
    }
}