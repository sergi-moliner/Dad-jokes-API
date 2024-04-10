var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//buttons
var nextJokeButton = document.getElementById('next-joke');
var BtnLike = document.getElementById('emoji-like');
var BtnOk = document.getElementById('emoji-ok');
var BtnDislike = document.getElementById('emoji-dislike');
//Array of reports
var reportAcudits = [];
//DOM elements
var jokeElement = document.getElementById('joke');
var weatherElement = document.getElementById('weather-info');
function getJoke() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://icanhazdadjoke.com/', {
                            headers: {
                                'Accept': 'application/json'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.joke];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error getting joke', error_1);
                    return [2 /*return*/, 'Error getting joke'];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function showJoke() {
    return __awaiter(this, void 0, void 0, function () {
        var joke;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!jokeElement) return [3 /*break*/, 2];
                    return [4 /*yield*/, getJoke()];
                case 1:
                    joke = _a.sent();
                    jokeElement.innerHTML = joke;
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
if (nextJokeButton) {
    nextJokeButton.addEventListener('click', showJoke);
}
showJoke();
//reviews
if (BtnLike) {
    BtnLike.addEventListener('click', function () {
        addJokeReview(3);
    });
}
if (BtnOk) {
    BtnOk.addEventListener('click', function () {
        addJokeReview(2);
    });
}
if (BtnDislike) {
    BtnDislike.addEventListener('click', function () {
        addJokeReview(1);
    });
}
function addJokeReview(score) {
    var _a;
    var jokeToReview = (_a = jokeElement === null || jokeElement === void 0 ? void 0 : jokeElement.textContent) !== null && _a !== void 0 ? _a : '';
    var existingReview = reportAcudits.findIndex(function (review) { return review.joke === jokeToReview; });
    if (existingReview != -1) {
        reportAcudits[existingReview].score = score;
        reportAcudits[existingReview].date = new Date().toISOString();
        console.log("La valoracio s'ha modificat:", reportAcudits);
    }
    else {
        var review = {
            joke: jokeToReview,
            score: score,
            date: new Date().toISOString()
        };
        reportAcudits.push(review);
        console.log("S'ha afegit una nova valoració:", reportAcudits);
    }
}
//weather info
function getWeather() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, weatherTemp, weatherIcon, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('http://api.weatherapi.com/v1/current.json?key=7000b05aaa4a49f2911110936240904&q=Barcelona&aqi=no')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    weatherTemp = data.current.temp_c;
                    weatherIcon = data.current.condition.icon;
                    return [2 /*return*/, { temp: weatherTemp, icon: weatherIcon }];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error getting weather', error_2);
                    return [2 /*return*/, 'Error getting weather'];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function showWeather() {
    return __awaiter(this, void 0, void 0, function () {
        var weather;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getWeather()];
                case 1:
                    weather = _a.sent();
                    if (weatherElement) {
                        if (typeof weather !== 'string') {
                            weatherElement.innerHTML = "<img src=\"https:".concat(weather.icon, "\" alt=\"").concat(weather.temp, "\">| ").concat(weather.temp, " \u00B0C");
                        }
                        else {
                            weatherElement.innerHTML = weather;
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
showWeather();
