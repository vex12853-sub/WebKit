
function createTests() {
    var simpleArray = ['a', 'b', 'c'];
    var simpleObject = {a:"1", b:"2", c:"3"};
    var complexArray = ['a', 'b', 'c',,,simpleObject, simpleArray, [simpleObject,simpleArray]];
    var complexObject = {a:"1", b:"2", c:"3", d:undefined, e:null, "":12, get f(){ return simpleArray; }, array: complexArray};
    var result = [];
    result.push(function(jsonObject){
        return jsonObject.stringify(1);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(1.5);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(-1);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(-1.5);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(null);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify("string");
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(new Number(0));
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(new Number(1));
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(new Number(1.5));
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(new Number(-1));
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(new Number(-1.5));
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(new String("a string object"));
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(new Boolean(true));
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(new Boolean(false));
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(true);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(false);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(new Date(0));
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({toJSON: Date.prototype.toJSON});
    });
    result[result.length - 1].throws = true;
    result.push(function(jsonObject){
        return jsonObject.stringify({toJSON: Date.prototype.toJSON, toISOString: function(){ return "custom toISOString"; }});
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({toJSON: Date.prototype.toJSON, toISOString: function(){ return {}; }});
    });
    result[result.length - 1].throws = true;
    result.push(function(jsonObject){
        return jsonObject.stringify({toJSON: Date.prototype.toJSON, toISOString: function(){ throw "An exception"; }});
    });
    result[result.length - 1].throws = true;
    result.push(function(jsonObject){
        var d = new Date(0);
        d.toISOString = null;
        return jsonObject.stringify(d);
    });
    result[result.length - 1].throws = true;
    result.push(function(jsonObject){
        var d = new Date(0);
        d.toJSON = undefined;
        return jsonObject.stringify(d);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({get Foo() { return "bar"; }});
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({get Foo() { this.foo="wibble"; return "bar"; }});
    });
    result.push(function(jsonObject){
        var count = 0;
        jsonObject.stringify({get Foo() { count++; return "bar"; }});
        return count;
    });
    result.push(function(jsonObject){
        var count = 0;
        return jsonObject.stringify({get Foo() { count++; delete this.bar; return "bar"; }, bar: "wibble"});
    });
    result.push(function(jsonObject){
        var count = 0;
        return jsonObject.stringify({a:"1", b:"2", c:"3", 5:4, 4:5, 2:6, 1:7});
    });
    result.push(function(jsonObject){
        var allString = true;
        jsonObject.stringify({a:"1", b:"2", c:"3", 5:4, 4:5, 2:6, 1:7}, function(k,v){allString = allString && (typeof k == "string"); return v});
        return allString;
    });
    result.push(function(jsonObject){
        var allString = true;
        jsonObject.stringify([1,2,3,4,5], function(k,v){allString = allString && (typeof k == "string"); return v});
        return allString;
    });
    result.push(function(jsonObject){
        var allString = true;
        var array = [];
        return jsonObject.stringify({a:"1", b:"2", c:"3", 5:4, 4:5, 2:6, 1:7}, array);
    });
    result.push(function(jsonObject){
        var allString = true;
        var array = ["a"];
        return jsonObject.stringify({get a(){return 1;array[1]="b";array[2]="c"}, b:"2", c:"3"}, array);
    });
    result.push(function(jsonObject){
        var allString = true;
        var array = [{toString:function(){array[0]='a'; array[1]='c'; array[2]='b'; return 'a'}}];
        return jsonObject.stringify(simpleObject, array);
    });
    result.push(function(jsonObject){
        var allString = true;
        var array = [1, new Number(2), NaN, Infinity, -Infinity, new String("str")];
        return jsonObject.stringify({"1":"1","2":"2","NaN":"NaN","Infinity":"Infinity","-Infinity":"-Infinity","str":"str"}, array);
    });
    result[result.length - 1].expected = '{"1":"1","2":"2","NaN":"NaN","Infinity":"Infinity","-Infinity":"-Infinity","str":"str"}';
    result.push(function(jsonObject){
        var allString = true;
        var array = ["1","2","3"];
        return jsonObject.stringify({1:'a', 2:'b', 3:'c'}, array);
    });
    result.push(function(jsonObject){
        var allString = true;
        var array = ["1","2","3"];
        return jsonObject.stringify(simpleArray, array);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(simpleArray, null, "  ");
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(simpleArray, null, 4);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(simpleArray, null, "ab");
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(simpleArray, null, 4);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(simpleObject, null, "  ");
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(simpleObject, null, 4);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(simpleObject, null, "ab");
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(simpleObject, null, 4);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(complexArray, null, "  ");
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(complexArray, null, 4);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(complexArray, null, "ab");
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(complexArray, null, 4);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(complexObject, null, "  ");
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(complexObject, null, 4);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(complexObject, null, "ab");
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(complexObject, null, 4);
    });
    var replaceTracker;
    function replaceFunc(key, value) {
        replaceTracker += key + "("+(typeof key)+")" + JSON.stringify(value) + ";";
        return value;
    }
    result.push(function(jsonObject){
        replaceTracker = "";
        jsonObject.stringify([1,2,3,,,,4,5,6], replaceFunc);
        return replaceTracker;
    });
    result[result.length - 1].expected = '(string)[1,2,3,null,null,null,4,5,6];0(number)1;1(number)2;2(number)3;3(number)undefined;4(number)undefined;5(number)undefined;6(number)4;7(number)5;8(number)6;'
    result.push(function(jsonObject){
        replaceTracker = "";
        jsonObject.stringify({a:"a", b:"b", c:"c", 3: "d", 2: "e", 1: "f"}, replaceFunc);
        return replaceTracker;
    });
    result[result.length - 1].expected = '(string){"a":"a","b":"b","c":"c","3":"d","2":"e","1":"f"};a(string)"a";b(string)"b";c(string)"c";3(string)"d";2(string)"e";1(string)"f";';
    result.push(function(jsonObject){
        var count = 0;
        var array = [{toString:function(){count++; array[0]='a'; array[1]='c'; array[2]='b'; return 'a'}}];
        jsonObject.stringify(simpleObject, array);
        return count;
    });
    result.push(function(jsonObject){
        var allString = true;
        var array = [{toString:function(){array[0]='a'; array[1]='c'; array[2]='b'; return 'a'}}, 'b', 'c'];
        return jsonObject.stringify(simpleObject, array);
    });
    result.push(function(jsonObject){
        var count = 0;
        var array = [{toString:function(){count++; array[0]='a'; array[1]='c'; array[2]='b'; return 'a'}}, 'b', 'c'];
        jsonObject.stringify(simpleObject, array);
        return count;
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({a:"1", get b() { this.a="foo"; return "getter"; }, c:"3"});
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({a:"1", get b() { this.c="foo"; return "getter"; }, c:"3"});
    });
    result.push(function(jsonObject){
        var setterCalled = false;
        jsonObject.stringify({a:"1", set b(s) { setterCalled = true; return "setter"; }, c:"3"});
        return setterCalled;
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({a:"1", get b(){ return "getter"; }, set b(s) { return "setter"; }, c:"3"});
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(new Array(10));
    });
    result.push(function(jsonObject){
        return jsonObject.stringify([undefined,,null,0,false]);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({p1:undefined,p2:null,p3:0,p4:false});
    });
    var cycleTracker = "";
    var cyclicObject = { get preSelf1() { cycleTracker+="preSelf1,"; return "preSelf1"; },
                             preSelf2: {toJSON:function(){cycleTracker+="preSelf2,"; return "preSelf2"}},
                             self: [],
                         get postSelf1() { cycleTracker+="postSelf1,"; return "postSelf1" },
                             postSelf2: {toJSON:function(){cycleTracker+="postSelf2,"; return "postSelf2"}},
                             toJSON : function(key) { cycleTracker += key + "("+(typeof key)+"):" + this; return this; }
                       };
    cyclicObject.self = cyclicObject;
    result.push(function(jsonObject){
        cycleTracker = "";
        return jsonObject.stringify(cyclicObject);
    });
    result[result.length - 1].throws = true;
    result.push(function(jsonObject){
        cycleTracker = "";
        try { jsonObject.stringify(cyclicObject); } catch(e) { cycleTracker += " -> exception" }
        return cycleTracker;
    });
    result[result.length - 1].expected = "(string):[object Object]preSelf1,preSelf2,self(string):[object Object] -> exception"
    var cyclicArray = [{toJSON : function(key,value) { cycleTracker += key + "("+(typeof key)+"):" + this; cycleTracker += "first,"; return this; }},
                       cyclicArray,
                       {toJSON : function(key,value) { cycleTracker += key + "("+(typeof key)+"):" + this; cycleTracker += "second,"; return this; }}];
    cyclicArray[1] = cyclicArray;
    result.push(function(jsonObject){
        cycleTracker = "";
        return jsonObject.stringify(cyclicArray);
    });
    result[result.length - 1].throws = true;
    result.push(function(jsonObject){
        cycleTracker = "";
        try { jsonObject.stringify(cyclicArray); } catch(e) { cycleTracker += " -> exception" }
        return cycleTracker;
    });
    result[result.length - 1].expected = "0(number):[object Object]first, -> exception";
    function createArray(len, o) { var r = []; for (var i = 0; i < len; i++) r[i] = o; return r; }
    var getterCalls;
    var magicObject = createArray(10, {abcdefg: [1,2,5,"ab", null, undefined, true, false,,], 
                                       get calls() {return ++getterCalls; }, 
                                       "123":createArray(15, "foo"), 
                                       "":{a:"b"}});
    result.push(function(jsonObject){
        getterCalls = 0;
        return jsonObject.stringify(magicObject) + " :: getter calls = " + getterCalls;
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(undefined);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify(null);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({toJSON:function(){ return undefined; }});
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({toJSON:function(){ return null; }});
    });
    result.push(function(jsonObject){
        return jsonObject.stringify([{toJSON:function(){ return undefined; }}]);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify([{toJSON:function(){ return null; }}]);
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({a:{toJSON:function(){ return undefined; }}});
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({a:{toJSON:function(){ return null; }}});
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({a:{toJSON:function(){ return function(){}; }}});
    });
    result.push(function(jsonObject){
        return jsonObject.stringify({a:function(){}});
    });
    result.push(function(jsonObject){
        var deepObject = {};
        for (var i = 0; i < 2048; i++)
            deepObject = {next:deepObject};
        return jsonObject.stringify(deepObject);
    });
    result.push(function(jsonObject){
        var deepArray = [];
        for (var i = 0; i < 2048; i++)
            deepArray = [deepArray];
        return jsonObject.stringify(deepArray);
    });
    result.push(function(jsonObject){
        var depth = 0;
        function toDeepVirtualJSONObject() {
            if (++depth >= 2048)
                return {};
            var r = {};
            r.toJSON = toDeepVirtualJSONObject;
            return {recurse: r};
        }
        return jsonObject.stringify(toDeepVirtualJSONObject());
    });
    result.push(function(jsonObject){
        var depth = 0;
        function toDeepVirtualJSONArray() {
            if (++depth >= 2048)
                return [];
            var r = [];
            r.toJSON = toDeepJSONArray;
            return [r];
        }
        return jsonObject.stringify(toDeepVirtualJSONArray());
    });
    var fullCharsetString = "";
    for (var i = 0; i < 65536; i++)
        fullCharsetString += String.fromCharCode(i);
    result.push(function(jsonObject){
        return jsonObject.stringify(fullCharsetString);
    });    
    return result;
}
var tests = createTests();
for (var i = 0; i < tests.length; i++) {
    try {
        debug(tests[i]);
        if (tests[i].throws)
            shouldThrow('tests[i](nativeJSON)');
        else if (tests[i].expected)
            shouldBe('tests[i](nativeJSON)',  'tests[i].expected')
        else
            shouldBe('tests[i](nativeJSON)',  'tests[i](JSON)');
    }catch(e){}
}
successfullyParsed = true;

