import { requestSerializer } from "./index";

// Ру варианты
const testPhones = [
  "+79253243134",
  "+7(925)324-31-34",
  "+7 (925) 324 31 34",
  "7 925 324 31 34",
  "7 (925) 324-31-34",
  "7 (925) 324 31 34",
  "89253243134",
  "8 925 324 31 34",
  "8 (925) 324 31 34",
  "8 (925) 324-31-34",
  "9253243134",
  "(925)324-31-34",
  "(925) 324-31-34",
  "(925) 324 31 34"
];

for (const phone of testPhones) {
  test(`${phone} parsed valid as +79253243134`, () => {
    const parsedPhone = requestSerializer({
      body: {
        phone: phone
      }
    });

    expect(parsedPhone).toStrictEqual({
      phone: "+79253243134"
    });
  });
}

const otherCountryPhones = [
  // Казахстан
  "+7(7182)38-09-36",
  "+7(7182)38-09-10",
  "+7(727)268-37-71",
  "+7(7172)23-78-93",
  "+7(7182)53-86-93",
  "+7(7212)22-35-71",
  "+7(7162)23-22-44",
  "+7(7187)37-50-91",
  "+7(7242)27-59-02",
  "+7(7112)50-23-99",
  "+7(7142)55-41-65",
  "+7(7172)23-23-33",
  "+7(7112)51-26-82",
  "+7(7182)45-79-13",
  "+7(7222)57-22-51",
  "+7(7252)32-10-88",
  "+7(727)231-03-32",
  "+7(7182)73-29-89",
  "+7(7252)47-92-61",
  "+7(7122)28-03-12",

  // Япония
  "+81 75 746 7271",
  "+81 75 603 5919",
  "+81 75 622 6110",
  "+81 75 862 3025",

  // Saudi Arabia
  "+966 56 169 7162",
  "+966 56 610 0864",
  "+966 56 885 1707",
  "+966 56 529 3550"
];

for (const phone of otherCountryPhones) {
  const onlyDigitsPhone = phone.replaceAll(/[\D]/g, "");
  const validPhoneInDatabase = `+${onlyDigitsPhone}`;

  test(`${phone} parsed valid as ${validPhoneInDatabase}`, () => {
    const parsedPhone = requestSerializer({
      body: {
        phone: phone
      }
    });

    expect(parsedPhone).toStrictEqual({
      phone: validPhoneInDatabase
    });
  });
}
