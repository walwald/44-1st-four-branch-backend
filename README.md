# 📍4bsop - Backend
**위코드 44기 1차 프로젝트** <br>
하이엔드 화장품 브랜드 Aesop을 모델링하여 커머셜 웹사이트 제작<br>

> *짧은 프로젝트 기간동안 개발에 집중해야 하므로 디자인/기획 부분만 클론했습니다.<br>
개발은 초기 세팅부터 전부 직접 구현했으며, 위 데모 링크는 모두 백앤드와 연결하여 실제 사용할 수 있는 서비스 수준으로 개발한 것입니다.*

<br>

## 1. 프로젝트 기간 & 인원
* 프로젝트 기간: 2주 (2023.04.03 ~ 2023.04.16)   
* 개발 인원:  
  `Frontend`: 김영운, 박지연 <br>
  `Backend`: 장다희(Project Manager), 왕광현(Product Manager) <br>
* [프론트엔드 Github 저장소](https://github.com/wecode-bootcamp-korea/44-1st-four-branch-frontend)
* 모델링한 사이트: [이솝(Aesop)](https://www.aesop.com/kr/)

<br>

 ## 2. 사용 기술

* **BackEnd** <br>

   JavaScript <br>
   Node.js v16.15 <br>
   express 4.18 <br>
   MySql 5.7 <br>
   Rest <br>
   Prettier <br>
   Docker <br>
   AWS <br>
 
<br>

* **협업** <br>

  Git & Git hub <br>
  Trello <br>
  Postman <br>
  Slack <br>
  Notion <br>

<br>

 ## 3. [ERD](https://dbdiagram.io/d/642a58b45758ac5f17262d7c)
 ![4bsop](https://github.com/walwald/44-1st-four-branch-backend/assets/120387100/2a16a5c0-1c81-450b-ad45-fc48c7051a3c)

<br>

 ## 4. 핵심 기능
 쇼핑몰 웹사이트의 핵심 기능인 `회원가입/로그인`, `상품 리스트`, `상품 상세 정보`, `상품 검색`, `장바구니`, `주문`, `결제` 기능을 구현하였습니다.
 
<details>
<summary>핵심 기능 설명 펼치기</summary>
<div markdown="1">
  
  <br>
 
 **1. 회원가입** 📌[코드 확인](https://github.com/walwald/44-1st-four-branch-backend/blob/034a67411cad420e16100865b4ccef38cd4ab8ee/services/userService.js#L10)
  
 - 고가 화장품 브랜드 특성상 구매 주기가 길고 선물용 1회성 구매가 많다는 점을 고려하여, user 수집 정보를 최소화하고 쉽고 간편한 회원 가입 기능을 구현했습니다
 - 정규표현식을 사용하여 이메일과 비밀번호의 유효성을 검증합니다.
 - 기 가입된 이메일로 중복 가입 시도 시 가입 불가하도록 에러 메시지를 반환합니다.
 - bcrypt를 사용하여 비밀번호 암호화 후 DB에 저장했습니다.
  
<br> 

 **2. 로그인** 📌[코드 확인](https://github.com/walwald/44-1st-four-branch-backend/blob/034a67411cad420e16100865b4ccef38cd4ab8ee/services/userService.js#L26)
 
 - DB내 저장된 암호화 된 비밀번호와 사용자가 입력한 비밀번호를 bcrypt로 암호화하여 비교 후 불일치하지 시 에러 메세지를 반환합니다. 
 - jwt를 활용하여 로그인 성공 시 payload에 user id가 담긴 토큰을 발급합니다.

  <br> 
  
 **3. 상품 정보 조회(리스트/상세 정보)** 📌[코드 확인](https://github.com/walwald/44-1st-four-branch-backend/blob/034a67411cad420e16100865b4ccef38cd4ab8ee/models/productDao.js#L23)

 - `메인 카테고리/서브 카테고리 필터`, `가격순 정렬`을 적용하여 상품 리스트 조회가 가능하며, `상품 id`로 필터하여 상품별 정보 조회가 가능합니다.
 - Frontend에서 동일한 endpoint에 필요에 따라 조건을 query parameter로 추가여 요청할 수 있도록 구현했습니다.
 - 화장품에 있어 성분이 중요한 요소이므로, 성분과 상품을 다대다 관계로 설계했습니다.
 - Product Dao 내 함수에서 단축 평가를 활용하여 각 조건문의 인자 유무를 판단, 하나의 query문으로 동작하도록 했습니다.
 - Order by와 Sorting, Offset과 Limit와 같이 두 인자가 함께 수신되어야 하는 경우, 하나의 인자만 수신되었을 때 에러 메시지를 반환합니다.
<br>

**4. 상품 검색** 📌[코드 확인](https://github.com/walwald/44-1st-four-branch-backend/blob/034a67411cad420e16100865b4ccef38cd4ab8ee/models/productDao.js#L3)

 - 검색어를 query parameter로 수신하여 검색어가 상품명에 포함된 상품들의 리스트를 전송합니다. 

<br>
  
**5. 인가(Authorization)** 📌[코드 확인](https://github.com/walwald/44-1st-four-branch-backend/blob/034a67411cad420e16100865b4ccef38cd4ab8ee/utils/auth.js#L5)
- `장바구니`, `주문`, `결제` 기능 이용 시 token을 해독하여 payload의 user id 확인 후 가입된 고객만 사용 가능하도록 인가 middleware를 구현했습니다.
- token이 수신되지 않은 경우 token이 필요하다는 에러 메시지를 반환합니다.
- payload 내 user id가 DB에서 확인되지 않을 경우 유효하지 않은 user라는 에러 메시지를 반환합니다.

<br>
  
**6. 장바구니 CRUD**

- **생성:** Cart Dao 내 query문에서 ON DUPLICATE을 활용하여, 카트에 특정 상품이 담겨있는 경우 '카트에 담기'를 다시 클릭하였을 때 수량이 1 증가하도록 구현했습니다. 📌[코드 확인](https://github.com/walwald/44-1st-four-branch-backend/blob/034a67411cad420e16100865b4ccef38cd4ab8ee/models/cartDao.js#L3)
- **수량 변경:** client가 전달한 수량으로 상품 수량을 업데이트 합니다. 📌[코드 확인](https://github.com/walwald/44-1st-four-branch-backend/blob/034a67411cad420e16100865b4ccef38cd4ab8ee/models/cartDao.js#L41)
- **삭제:** 삭제 요청에 따라 장바구니 내 상품을 삭제합니다. 📌[코드 확인](https://github.com/walwald/44-1st-four-branch-backend/blob/034a67411cad420e16100865b4ccef38cd4ab8ee/models/cartDao.js#L16)
<br>

**7. 주문** 📌[코드 확인](https://github.com/walwald/44-1st-four-branch-backend/blob/034a67411cad420e16100865b4ccef38cd4ab8ee/models/orderDao.js#L50)

- 배송 주소 별도 저장 후, 주문 정보와 주문 상품 정보를 DB에 저장합니다.
- uuid를 사용하여 고유 주문 번호를 생성 했습니다.
- MySql의 transaction 기능을 활용하여 `주문 정보 저장`과 `주문 상품 정보 저장`이 함께 이루어지고, 에러 발생 시 함께 철회되도록 구현했습니다.
<br>

**8. 포인트 결제** 📌[코드 확인](https://github.com/walwald/44-1st-four-branch-backend/blob/034a67411cad420e16100865b4ccef38cd4ab8ee/models/orderDao.js#L4)
  
- 회원이 보유한 포인트에서 주문 총액이 차감되는 API입니다.
- MySql의 transaction 기능을 활용하여 `고객 포인트 차감`, `주문 및 주문 상품 상태 업데이트 (결제 대기 -> 결제 완료)`, `카트 내역 삭제`가 함께 동작하며, 에러 발생 시 함께 철회되도록 구현했습니다.
- 주문 총액이 보유 포인트보다 적을 경우 에러를 반환합니다.

</div>
</details>
<br>

<br>

## 5. 핵심 트러블슈팅
 **1. 상품 조회 API - productDao 쿼리문 효율화**
- 상품리스트와 상품 상세 페이지 구현을 위해 [상위 카테고리, 하위 카테고리, 정렬 조건, 페이지네이션, 상품 id] 등 다양한 조건에 따라 상품 정보를 보내는 API 구현하게 되었습니다. 
- 처음에는 각 조건에 따라 데이터를 불러오는 function을 productDao 내에 각각 작성했습니다. 
- 같은 SELECT문에 조건만 다르게 붙은 함수를 반복적으로 작성하는 과정에서, 하나의 함수로 이 기능을 구현할 수는 없을까 하는 의구심이 들었습니다.
- 하나의 함수를 재사용할 수 있도록 if-else if문을 사용하여 조건에 따라 쿼리문이 달라지는 함수를 작성하였습니다.  

  <details>
  <summary>if-else if문을 활용한 코드</summary>
  <div markdown="1">
  
    
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
    
 - if-else if문을 사용한 함수에서는 정렬과 페이지네이션이 등 여러 조건이 동시에 적용되기 어렵다는 사실을 깨닫고, 이를 해결하기 위해 `단축 평가`를 활용하여 함수를 수정했습니다.
  
    <details>
    <summary>단축 평가를 활용한 코드</summary>
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
- console.log()로 데이터 타입을 확인하여 문제를 확인할 수 있었습니다.

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

  
- user의 point와 주문 총액(totalPrice)이 `string` 타입으로 인식되어 point가 `10,000,000` 있더라도 주문 총액이 `900,000`이라면 if문이 실행되어 에러를 반환하는 것이었습니다.
- 두 값을 number 타입으로 인식시키기 위해 빼기(-) 연산을 사용하여 코드를 수정했습니다. 
  
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
                                          
<br>
                                          
  </div>
  </details>

<br>
  
## 6. 느낀점/회고
> 1차 프로젝트 회고: https://walwaldev.tistory.com/49
    
  <br>
  
## Reference

- 이 프로젝트는 [이솝](https://www.aesop.com/kr/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
