function validate(data, rules) {
  let arrTrue = {
    result: true,
    errors: []
  };

  let arrFalse = {
    result: false,
    errors: [],
  };

  for (let [key, ruleValue] of Object.entries(rules)) {

    if (Object.keys(data).length === 0) {
      if (ruleValue.hasOwnProperty('required')) {
        arrFalse.errors.push({ field: key, value: undefined, rule: 'required' });
        break;
      }
    } else {

      for (let [keyData, valueData] of Object.entries(data)) {
        if (key === keyData && ruleValue.hasOwnProperty('required')) {
          if (valueData === null || valueData === undefined) {
            arrFalse.errors.push({ field: key, value: valueData, rule: 'required' });
            break;
          } else {
            continue;
          }
        }

        if (key === keyData && ruleValue.hasOwnProperty('minLength')) {
          if (String(valueData).length < Number(ruleValue.minLength)) {
            arrFalse.errors.push({ field: key, value: valueData, rule: 'minLength' });
          }
        }

        if (key === keyData && ruleValue.hasOwnProperty('maxLength')) {
          if (String(valueData).length > Number(ruleValue.maxLength) || valueData == 1) {
            arrFalse.errors.push({ field: key, value: valueData, rule: 'maxLength' });
          }
        }
        if (key === keyData && ruleValue.hasOwnProperty('isString')) {
          if (typeof valueData !== 'string') {
            arrFalse.errors.push({ field: key, value: valueData, rule: 'isString' });
          } else {
            continue;
          }
        }
        if (key === keyData && ruleValue.hasOwnProperty('min')) {
          if (Number(valueData) < Number(ruleValue.min) || Number.isNaN(valueData)) {
            arrFalse.errors.push({ field: key, value: valueData, rule: 'min' });
          }
        }

        if (key === keyData && ruleValue.hasOwnProperty('max')) {
          if (Number(valueData) > Number(ruleValue.max) || Number.isNaN(valueData)) {
            arrFalse.errors.push({ field: key, value: valueData, rule: 'max' });
          }
        }

        if (key === keyData && ruleValue.hasOwnProperty('isNumber')) {
          if (typeof valueData !== 'number' || Number.isNaN(valueData)) {
            arrFalse.errors.push({ field: key, value: valueData, rule: 'isNumber' });
          } else {
            continue;
          }
        }

        if (key === keyData && ruleValue.hasOwnProperty('isBoolean')) {
          if (typeof valueData !== 'boolean') {
            arrFalse.errors.push({ field: key, value: valueData, rule: 'isBoolean' });
          } else {
            continue;
          }
        }

        if (key === keyData && ruleValue.hasOwnProperty('isEmail')) {
          let regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/gm;
          if (valueData.match(regexp)) {
            continue;
          } else {
            arrFalse.errors.push({ field: key, value: valueData, rule: 'isEmail' });
          }
        }
      }
    }
  }

  if (arrFalse.errors.length > 0) {
    return arrFalse;
  } else {
    return arrTrue;
  }
}

module.exports = validate;