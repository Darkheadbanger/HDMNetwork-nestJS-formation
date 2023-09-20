// NestJS use TypeScript, TypeScript is a superset of JavaScript, which means that any valid JavaScript code is also valid TypeScript code. TypeScript adds new features to JavaScript, like static typing. TypeScript code needs to be compiled to JavaScript before it can be executed. NestJS uses the TypeScript compiler to transpile the code to JavaScript. The TypeScript compiler is called tsc. NestJS uses the tsconfig.json file to configure the TypeScript compiler. The tsconfig.json file is located in the root of the project. The tsconfig.json file contains the compilerOptions property, which is used to configure the TypeScript compiler. The tsconfig.json file contains the following compilerOptions
// Ici, on créer  en dur les basses de données pour les tests
const data: Data = {
  report: [],
};
interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}

enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

data.report.push({
  id: 'uuid1',
  source: 'Salary',
  amount: 7500,
  created_at: new Date(),
  updated_at: new Date(),
  type: ReportType.INCOME,
});
data.report.push({
  id: 'uuid2',
  source: 'Salary',
  amount: 7500,
  created_at: new Date(),
  updated_at: new Date(),
  type: ReportType.EXPENSE,
});

export { data, ReportType };
