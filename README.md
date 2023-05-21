# 4bsop 커머셜 웹사이트 제작 (Backend)
장다희 ([**Github**](https://github.com/walwald), [회고록](https://walwaldev.tistory.com/49))<br>
왕광현 ([회고록](https://khwang24.tistory.com/14))<br>
> 위코드 44기 1차 프로젝트 <br>
> 하이엔드 화장품 브랜드 Aesop을 모델링하여 커머셜 웹사이트 제작<br>
[결과물 url](http://s3-hosting-jiyeoun.s3-website.ap-northeast-2.amazonaws.com/)

> **짧은 프로젝트 기간동안 개발에 집중해야 하므로 디자인/기획 부분만 클론했습니다.<br>
개발은 초기 세팅부터 전부 직접 구현했으며, 아래 데모 영상에서 보이는 부분은 모두 백앤드와 연결하여 실제 사용할 수 있는 서비스 수준으로 개발한 것입니다.*

## 📍프로젝트 기간 & 인원
* 프로젝트 기간: 2주 (2023.04.03 ~ 2023.04.16)   
* 개발 인원:  
  `Frontend`: 김영운, 박지연 <br>
  `Backend`: 장다희(Project Manager), 왕광현(Product Manager) <br>
* [프론트엔드 Github 저장소](https://github.com/wecode-bootcamp-korea/44-1st-four-branch-frontend)
* 모델링한 사이트: [이솝(Aesop)](https://www.aesop.com/kr/)
 
 ## 📍사용 기술

* BackEnd   

 |JavaScript|Node.js|MySql|Rest|Prettier|Docker|AWS|
|---|---|---|---|---|---|---|
|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /></div>| <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/nginx-icon.svg" alt="icon" width="65" height="65" /></div>| <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/restapi-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/docker-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/aws-icon.svg" alt="icon" width="65" height="65" /></div>|
<br>

* 협업 <br><br>
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <br>
<img src="https://img.shields.io/badge/trello-0055cc?style=for-the-badge&logo=trello&logoColor=yellow"> <br>
<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=Slack&logoColor=wihte"> <br>
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <br>

 ## 📍ERD
 
![image](https://user-images.githubusercontent.com/120387100/233080857-d5912540-1add-4c1d-aa7f-048d97d52026.png)

 ## 📍핵심 기능
 > 쇼핑몰 웹사이트의 핵심 기능인 [회원가입/로그인, 상품 리스트, 상품 상세 정보, 상품 검색, 장바구니, 주문, 결제] 기능을 구현하였습니다.
 
<details>
<summary>핵심 기능 설명 펼치기</summary>
<div markdown="1">
  
 ### Users
 
 **회원가입**
 
 ![image](https://user-images.githubusercontent.com/120387100/233130362-68af441f-5992-4719-bc03-48cd543a8711.png)
 
 : 고가 화장품 브랜드 특성상 구매 주기가 길고 선물용 1회성 구매가 많다는 점을 고려하여, user 수집 정보를 최소화하고 쉽고 간편한 회원 가입 기능 구현
 - 정규표현식 사용하여 이메일과 비밀번호의 유효성 검증
 - 기 가입된 이메일로 중복 가입 시도 시 가입 불가하도록 에러 메시지 반환
 - bcrypt를 사용하여 비밀번호 암호화 후 DB에 저장
<br> 

 **로그인**
 
![image](https://user-images.githubusercontent.com/120387100/233130405-6b5bf0ed-6f61-4cdc-9957-0603b8e25b4a.png)

 - DB내 저장된 암호화 된 비밀번호와 사용자가 입력한 비밀번호를 bcrypt로 암호화하여 비교 후 불일치하지 시 에러 메세지 반환 
 - jwt를 활용하여 로그인 성공 시 payload에 user id가 담긴 토큰 발급

***
 
 ### Products

 **상품 정보** 
  
![image](https://user-images.githubusercontent.com/120387100/233131367-a349f24d-f75d-429f-9158-7b4dfa8e147a.png)
![image](https://user-images.githubusercontent.com/120387100/233131390-f4d465d4-f806-4174-bfd1-8b8f5f4744d2.png)
![image](https://user-images.githubusercontent.com/120387100/233131416-2b3529d5-e080-4f50-9f9f-ed494d101c01.png)
![image](https://user-images.githubusercontent.com/120387100/233132070-5c251208-72a1-4a47-ada9-61a4384437e8.png)

 : 메인 카테고리/서브 카테고리 필터, 가격순 정렬, 상품 id 필터 적용 가능한 상품 정보 조회 API 구현
 - Frontend에서 동일한 endpoint에 필요에 따라 조건을 query parameter로 추가여 요청할 수 있도록 구현
 - 상품 리스트 페이지와 상품 상세 페이지에 모두 사용 가능
 - 화장품에 있어 성분이 중요한 요소이므로, 성분과 상품이 다대다 관계인 ERD 구축
 - Product Dao 내 함수에서 단락평가를 활용하여 각 조건문의 인자 유무를 판단, 하나의 query문으로 동작하도록 함
 - Order by와 Sorting, Offset과 Limit와 같이 두 인자가 함께 수신되어야 하는 경우, 하나의 인자만 수신되었을 때 에러 메시지 노출
<br>

**상품 검색**

![image](https://user-images.githubusercontent.com/120387100/233131707-1717bbf3-4e15-45e6-8c02-fda2069340af.png)

 : 검색어 입력 시 해당 단어가 상품명에 포함된 상품 정보 리스트 전송 API 구현
 - 검색어를 query parameter로 수신하여 검색어가 상품명에 포함된 상품들의 상품 id, 상품명, 이미지url 전송 
***
### 인가(Authorization)
: 장바구니, 주문, 결제 기능 이용 시 token을 해독하여 payload의 user id 확인 후 가입된 고객만 사용 가능하도록 middleware 구현
- token이 수신되지 않은 경우 token이 필요하다는 에러 메시지 반환
- payload 내 user id가 DB에서 확인되지 않을 경우 유효하지 않은 user라는 에러 메시지 반환
***
### Carts

**장바구니 상품 추가**

![image](https://user-images.githubusercontent.com/120387100/233132301-3e610122-ba96-481d-918e-f0107bf53d7e.png)

![image](https://user-images.githubusercontent.com/120387100/233133239-4255f179-2d67-41a7-b5d2-c7c481fbc39d.png)

: 상품 상세 페이지에서 '장바구니에 추가' 버튼 클릭 시 cart DB에 상품이 추가되고 장바구니 내역 데이터를 반환하는 API 구현
- Cart Dao 내 query문에서 ON DUPLICATE을 활용하여, 카트에 특정 상품이 담겨있는 경우 '카트에 담기'를 클릭하였을 때 수량이 1 증가하도록 구현
<br>

**장바구니 내 상품 수량 변경**

![image](https://user-images.githubusercontent.com/120387100/233133400-08bf4ff8-9f3d-44ee-afc9-7b508cdb9b36.png)


: 장바구니에서 상품 수량 변경 시 cart DB의 상품 수량이 변경되고 장바구니 내역 데이터를 반환하는 API 구현
<br><br>

**장바구니 상품 삭제**

![image](https://user-images.githubusercontent.com/120387100/233133271-1f133a53-abeb-49e3-9e51-e72904539118.png)

![image](https://user-images.githubusercontent.com/120387100/233133602-47bf7e6b-5042-411b-83af-dda58d08f8fe.png)

: 장바구니에서 삭제 버튼 클릭 시 cart DB의 상품이 삭제되고 장바구니 내역 데이터를 반환하는 API 구현
***

### Orders
**주문**

![image](https://user-images.githubusercontent.com/120387100/233134954-fbd62c3f-09bd-48cc-8c02-db69ab90607d.png)
![image](https://user-images.githubusercontent.com/120387100/233135394-8e089560-a7c7-4bf5-bb7e-dc891c19df2f.png)

: 배송 주소 별도 저장 후, 주문 정보와 주문 상품 정보를 DB에 저장하는 API 구현
- uuid를 사용하여 고유 주문 번호 생성
- MySql의 transaction 기능을 활용하여 `주문 정보 저장`과 `주문 상품 정보 저장`이 함께 이루어지고, 에러 발생 시 함께 철회되도록 구현
<br>

**결제**

![image](https://user-images.githubusercontent.com/120387100/233135433-974e157e-5517-4c4e-8ae3-8be6ad1e885b.png)
![image](https://user-images.githubusercontent.com/120387100/233135468-f971555b-eb8e-495c-bcdb-4d58842bfa4a.png)

: 회원이 보유한 포인트로 주문 총액이 결제된 후 주문 내역 정보를 반환하는 API 구현
- MySql의 transaction 기능을 활용하여 '고객 포인트 차감, 주문 및 주문 상품 상태 `결제 대기`에서 `결제 완료`로 변경, 카트 내역 삭제'가 함께 동작하며, 에러 발생 시 함께 철회되도록 구현
- 주문 총액이 보유 포인트보다 적을 경우 에러 메시지 반환
- 결제 완료 후 주문 및 결제 완료 상태의 주문 내역 반환
</div>
</details>
<br>

## 📍핵심 트러블슈팅
 **1. 상품 조회 API - productDao 쿼리문 효율화**
- 상품리스트와 상품 상세 페이지 구현을 위해 [상위 카테고리, 하위 카테고리, 정렬 조건, 페이지네이션, 상품 id] 등 다양한 조건에 따라 상품 정보를 보내는 API 구현하게 되었습니다. 
- 처음에는 각 조건에 따라 데이터를 불러오는 query문이 포함된 function을 productDao 내에 각각 작성했습니다. 
- 같은 SELECT문에 조건만 다르게 붙은 함수를 반복적으로 작성하는 과정에서, 하나의 함수로 이 기능을 구현할 수는 없을까 하는 의구심이 들었습니다.

  <details>
  <summary>기존 코드</summary>
  <div markdown="1">
  
    - 조건에 따라 if문이 실행되도록 설계
    
    ```Javascript
    //productDao.js - if문을 활용한 getProductByCondition 함수

    const getProductsByCondition = async (subId, mainId, pId, isMain) => {
      try {
        let condition = '';
        if (subId) {
          condition = `WHERE sc.id = ${subId}`;
        } else if (mainId) {
          condition = `WHERE m.id = ${mainId}`;
        } else if (pId) {
          condition = `WHERE p.id = ${pId}`;
        } else if (isMain) {
          condition = `WHERE p.main_product = ${isMain}`;
        }

        return await appDataSource.query(
          `SELECT 
            p.id,
            p.name,
            p.price,
            p.description,
            p.size_id sizeId,
            p.sub_category_id subCategoryId,
            s.size size,
            sc.name subCategoryName,
            m.id mainCategoryId,
            m.name mainCategoryName,
            i.url imageUrl,
            joined_ig.ig_array ingredients
        FROM products p
        JOIN sizes s ON p.size_id = s.id
        JOIN sub_categories sc ON sc.id = p.sub_category_id
        JOIN main_categories m ON sc.main_category_id = m.id
        JOIN products_images pi ON p.id = pi.product_id
        JOIN images i ON i.id = pi.image_id
        JOIN (
            SELECT
                pig.product_id pid,
                JSON_ARRAYAGG(ig.name) ig_array
            FROM ingredients ig
            JOIN products_ingredients pig ON pig.ingredient_id = ig.id
            GROUP BY pig.product_id
        ) joined_ig ON joined_ig.pid = p.id        
        ${condition}`
        );
      } catch (err) {
        err.message = 'DATABASE_ERROR';
        err.statusCode = 400;
        throw err;
      }
    };
  ```
  </div>
  </details>
    
 - 기존 코드에서는 정렬과 페이지네이션이 동시에 적용되기 어렵다는 사실을 깨닫고, 이를 해결하기 위해 `단축 평가`를 활용하여 함수를 만들었습니다.
  
    <details>
    <summary>수정된 코드</summary>
    <div markdown="1">
      
      ```JavaScript
      //productDao.js - 단축 평가를 활용한 getProductsByCondition 함수

      const getProductsByCondition = async (
        subId,
        mainId,
        pId,
        isMain,
        orderBy,
        sorting,
        offset = 0,
        limit = 10
      ) => {
        try {
          const conditions = [
            subId && `WHERE sc.id = ${subId}`,
            mainId && `WHERE m.id = ${mainId}`,
            pId && `WHERE p.id = ${pId}`,
            isMain && `WHERE p.main_product = ${isMain}`,
          ].filter(Boolean);

          const orderings = [
            orderBy && `ORDER BY ${orderBy}`,
            sorting && `${sorting}`,
          ].filter(Boolean);

          const pagination = [
            limit && `LIMIT ${limit}`,
            offset && `OFFSET ${offset}`,
          ].filter(Boolean);

          const condition = conditions[0] || '';
          const ordering = orderings.join(' ') || '';
          const paging = pagination.join(' ') || '';

          return await appDataSource.query(
            `SELECT 
              p.id,
              p.name,
              p.price,
              p.description,
              p.summary,
              p.size_id sizeId,
              p.sub_category_id subCategoryId,
              s.size size,
              sc.name subCategoryName,
              m.id mainCategoryId,
              m.name mainCategoryName,
              i.url imageUrl,
              joined_ig.ig_array ingredients
          FROM products p
          LEFT JOIN sizes s ON p.size_id = s.id
          LEFT JOIN sub_categories sc ON sc.id = p.sub_category_id
          LEFT JOIN main_categories m ON sc.main_category_id = m.id
          LEFT JOIN products_images pi ON p.id = pi.product_id
          LEFT JOIN images i ON i.id = pi.image_id
          LEFT JOIN (
              SELECT
                  pig.product_id pid,
                  JSON_ARRAYAGG(ig.name) ig_array
              FROM ingredients ig
              JOIN products_ingredients pig ON pig.ingredient_id = ig.id
              GROUP BY pig.product_id
          ) joined_ig ON joined_ig.pid = p.id        
          ${condition}
          ${ordering}
          ${paging}`
          );
        } catch (err) {
          err.message = 'DATABASE_ERROR';
          err.statusCode = 400;
          throw err;
        }
      };
      
      ```
      
      - [orderBy - sorting], [offset - limit]과 같이 경우 반드시 pair로 들어와야하는 경우를 커버하기 위해 productService 함수 내에 에러 핸들러를 작성했습니다.

      ```JavaScript
      //productService.js - 반드시 함께 들어와야 하는 인자에 대한 에러처리 if문

      if (!orderBy !== !sorting) {
        const err = new Error('CONDITION_NEEDS_TO_BE_PAIR');
        err.statusCode = 400;
        throw err;
      }

      if (!offset !== !limit) {
        const err = new Error('CONDITION_NEEDS_TO_BE_PAIR');
        err.statusCode = 400;
        throw err;
      }
      ```
    </div>
    </details>
  
  <br>
    
 **2. 결제 API - 잔액 부족 에러 해결**
- point 결제 API 통신 중, user의 보유 point가 충분함에도 잔액 부족 Error가 발생하는 상황이 생겼습니다. 
- 분명 잔액 point가 충분함을 확인했고, 코드를 아무리 쳐다봐도 왜 error가 나는지 이해할 수 없었는데, console.log()로 데이터 타입을 확인해보니 문제를 알 수 있었습니다.

  <details>
  <summary>기존 코드</summary>
  <div markdown="1">

    ```JavaScript
    //orderService.js - 잔액이 충분해도 잔액 부족 에러가 났던 기존 코드

    if (user.point < order.totalPrice) {
        const err = new Error('INSUFFICIENT_POINT');
        err.statusCode = 400;
        throw err;
    };
    ```

  </div>
  </details>

  
- user.point와 order.totalPrice가 `string` 타입으로 인식되어 user.point가 [10,000,000] 있더라도 order.totalPrice가 [900,000]이라면 if문이 동작하여 에러로 인식되는 것이었습니다.
- 둘을 number 타입으로 인식시키기 위해 코드를 수정했습니다. 
  
  <details>
  <summary>수정된 코드</summary>
  <div markdown="1">
    
   ```JavaScript
    //orderService.js - 숫자로 인식되도록 수정한 코드

    if (user.point - order.totalPrice < 0) {
        const err = new Error('INSUFFICIENT_POINT');
        err.statusCode = 400;
        throw err;
    }
   ```

  </div>
  </details>

<br>
  
***

## Reference

- 이 프로젝트는 [이솝](https://www.aesop.com/kr/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
