/*
 * @Description: This is a XX file
 * @Author: JeanneWu
 * @Date: 2020-11-07 16:44:56
 */

import * as program from "commander";
program
  .command("add")
  .description("To create todo list")
  .action((...args) => {
    // console.log('Add successfully!');
    args.splice(0, 1);
    console.log(args, "1");
    // const words = args[0] && args[0].join(' ') || ''
  });
