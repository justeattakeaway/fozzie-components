import { registerAllureReporter } from "jest-allure/dist/setup";
import path from "path"
var resultsDir =  path.resolve("../../../../allure-results");

registerAllureReporter(resultsDir);