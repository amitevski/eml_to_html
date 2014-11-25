#!/usr/bin/env node

var MailParser = require('mailparser').MailParser;
var mailparser = new MailParser();
var fs = require('fs');

var opts = require("nomnom")
  .option('infile', {
    abbr: 'i',
    required: true,
    help: 'Specify input file'
  })
  .option('outfile', {
    abbr: 'o',
    required: true,
    help: 'Specify output file'
  })
  .parse();


mailparser.on("end", function(mail){
  fs.writeFileSync(opts.outfile, mail.html);
});

fs.createReadStream(opts.infile).pipe(mailparser);
