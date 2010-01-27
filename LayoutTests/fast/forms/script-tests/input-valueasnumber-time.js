description('Tests for .valueAsNumber with &lt;input type=time>.');

var input = document.createElement('input');
input.type = 'time';

function valueAsNumberFor(stringValue) {
    input.value = stringValue;
    return input.valueAsNumber;
}

function setValueAsNumberAndGetValue(hour, minute, second, ms) {
    input.valueAsNumber = ((hour * 60 + minute) * 60 + second) * 1000 + ms;
    return input.value;
}

shouldBe('valueAsNumberFor("")', 'Number.NaN');
shouldBe('valueAsNumberFor("00:00:00.000")', 'Date.UTC(1970, 0, 1, 0, 0, 0, 0)');
shouldBe('valueAsNumberFor("04:35")', 'Date.UTC(1970, 0, 1, 4, 35, 0, 0)');
shouldBe('valueAsNumberFor("23:59:59.999")', 'Date.UTC(1970, 0, 1, 23, 59, 59, 999)');

shouldBe('setValueAsNumberAndGetValue(0, 0, 0, 0)', '"00:00"');
shouldBe('setValueAsNumberAndGetValue(0, 0, 1, 0)', '"00:00:01"');
shouldBe('setValueAsNumberAndGetValue(0, 0, 0, 2)', '"00:00:00.002"');
shouldBe('setValueAsNumberAndGetValue(11, 59, 59, 999)', '"11:59:59.999"');
shouldBe('setValueAsNumberAndGetValue(12, 0, 0, 0)', '"12:00"');
shouldBe('setValueAsNumberAndGetValue(23, 59, 59, 999)', '"23:59:59.999"');
shouldBe('setValueAsNumberAndGetValue(24, 0, 0, 0)', '"00:00"');
shouldBe('setValueAsNumberAndGetValue(48, 0, 13, 0)', '"00:00:13"');
shouldBe('setValueAsNumberAndGetValue(-23, -59, -59, 0)', '"00:00:01"');

debug('Tests to set invalid values to valueAsNumber:');
shouldBe('input.value = ""; input.valueAsNumber = null; input.value', '"00:00"');
shouldThrow('input.valueAsNumber = "foo"', '"Error: NOT_SUPPORTED_ERR: DOM Exception 9"');
shouldThrow('input.valueAsNumber = NaN', '"Error: NOT_SUPPORTED_ERR: DOM Exception 9"');
shouldThrow('input.valueAsNumber = Number.NaN', '"Error: NOT_SUPPORTED_ERR: DOM Exception 9"');
shouldThrow('input.valueAsNumber = Infinity', '"Error: NOT_SUPPORTED_ERR: DOM Exception 9"');
shouldThrow('input.valueAsNumber = Number.POSITIVE_INFINITY', '"Error: NOT_SUPPORTED_ERR: DOM Exception 9"');
shouldThrow('input.valueAsNumber = Number.NEGATIVE_INFINITY', '"Error: NOT_SUPPORTED_ERR: DOM Exception 9"');

debug('Step attribute value and string representation:');
// If the step attribute value is 1 second and the second part is 0, we should show the second part.
shouldBe('input.step = "1"; setValueAsNumberAndGetValue(0, 0, 0, 0)', '"00:00:00"');
// If the step attribute value is 0.001 second and the millisecond part is 0, we should show the millisecond part.
shouldBe('input.step = "0.001"; setValueAsNumberAndGetValue(0, 0, 0, 0)', '"00:00:00.000"');

var successfullyParsed = true;
