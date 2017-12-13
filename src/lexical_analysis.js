function getYul () {
  clearToken()
  while(isSpace() || isNewline() || isTab())
    getChar()
  if (isLetter()) {
    while(isLetter() || isDigit()) {
      catToken()
      getChar()
    }
    retract()
    resultValue = reserver()
    if (resultValue == 0) symbol = IDSY
    else symbol = resultValue
  } else if (isDigit()) {
    while (isDigit()) {
      catToken()
      getChar()
    }
    retract()
    num = transNum(token)
    symbol = INTSY
  } else if (isColon()) {
    getChar()
    if (isEqu()) {
      symbol = ASSIGNSY
    } else {
      retract()
      symbol = COLONSY
    }
  } else if (isPlus()) {
    symbol = PLUSSY
  } else if (isMinus()) {
    symbol = MINUSSY
  } else if (isStar()) {
    symbol = STARSY
  } else if (isLpar()) {
    symbol = STARSY
  } else if (isRpar()) {
    symbol = STARSY
  } else if (isComma()) {
    symbol = STARSY
  } else if (isSemi()) {
    symbol = STARSY
  } else if (isDivi()) {
    getChar()
    if (isStar()) {
      do {
        do {
          getChar()
        } while (!isStar())
        do {
          getChar()
          if (isDivi()) return 0
        } while (isStar())
      } while (!isStar())
    }
    retract()
    symbol = DIVISY
  } else {
    error()
    return 0
  }
}
