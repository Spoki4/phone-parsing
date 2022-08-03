import libphonegoogle_parsePhoneNumber from "libphonenumber-js";

function tryParseRussianFormat(phoneString) {
  const phoneOnlyDigits = phoneString.replaceAll(/[\D]/g, "");

  // Проверяем кейс, когда нет первой цифры, не 7 и не 8
  if (phoneOnlyDigits.length === 10) {
    return `+7${phoneOnlyDigits}`;
  } else if (
    phoneOnlyDigits.length === 11 &&
    (phoneOnlyDigits.startsWith("8") || phoneOnlyDigits.startsWith("7"))
  ) {
    return `+7${phoneOnlyDigits.slice(1)}`;
  }

  return null;
}

export function requestSerializer(req) {
  if (!req.body.phone) {
    return {
      phone: null
    };
  }

  const phone = req.body.phone.trim();
  const phoneNumber = libphonegoogle_parsePhoneNumber(phone);

  if (phoneNumber && phoneNumber.isValid()) {
    return {
      phone: phoneNumber.number
    };
  }

  const maybeParsedRussianPhone = tryParseRussianFormat(phone);

  if (maybeParsedRussianPhone) {
    return {
      phone: maybeParsedRussianPhone
    };
  }

  // Кидаем 400 ошибку валидации
  throw new Error("400 номер телефона неверного формата");
}
