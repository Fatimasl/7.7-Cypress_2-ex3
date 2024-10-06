describe("Магазин питомцев", () => {
  const generateUserName = (length) => {
    let name = "";
    let chars =
      "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm 1234567890"; //возможные символы
    let charLength = chars.length; //определяем длину
    for (let i = 0; i < length; i++) {
      //запускаем цикл для формирования строки
      name += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return name;
  };

  it("Создание пользователя, его логин, изменение данных пользователя, выход пользователя, удаление пользователя", () => {
    let username = generateUserName(10);
    let userid = Math.round(Math.random() * 999999);
    cy.request("POST", "/user", {
      id: userid,
      username: username,
      email: "ivanov.i@mail.ru",
      password: "123456",
      phone: "+79051234545",
      userStatus: 0,
    }).then((response) => {
      expect(response.status).to.eq(200);

      //логин пользователя
      cy.request("/user/login", {
        username: username,
        password: "123456",
      }).then((response) => {
        expect(response.status).to.eq(200);

        //изменение данных пользователя
        cy.request("PUT", `/user/${username}`, {
          id: userid,
          username: username,
          email: "ivanov.i@yndex.ru",
          password: "123456",
          phone: "+799999999",
          userStatus: 0,
        }).then((response) => {
          expect(response.status).to.eq(200);

          //выход пользователя
          cy.request("/user/logout").then((response) => {
            expect(response.status).to.eq(200);

            //удаление пользователя
            cy.request("DELETE", `/user/${username}`).then((response) => {
              expect(response.status).to.eq(200);

              //проверка, что такого пользователя нет в базе
              cy.request({
                url: `/user/${username}`,
                method: "GET",
                failOnStatusCode: false,
              }).then((response) => {
                expect(response.status).to.eq(404);
              });
            });
          });
        });
      });
    });
  });

  it("Создание пользователя", () => {
    let username = generateUserName(10);
    let userid = Math.round(Math.random() * 999999);
    cy.request("POST", "/user", {
      id: userid,
      username: username,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Создание пользователя и его изменение", () => {
    let username = generateUserName(10);
    let userid = Math.round(Math.random() * 999999);
    cy.request("POST", "/user", {
      id: userid,
      username: username,
    }).then((response) => {
      expect(response.status).to.eq(200);
      //логин пользователя
      cy.request("/user/login", {
        username: username,
        password: "123456",
      }).then((response) => {
        expect(response.status).to.eq(200);

        //изменение данных пользователя
        cy.request("PUT", `/user/${username}`, {
          id: userid,
          username: username,
          email: "ivanov.i@yndex.ru",
          password: "123456",
          phone: "+799999999",
          userStatus: 0,
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
});