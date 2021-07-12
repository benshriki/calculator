using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace calc.Controllers
{
    [ApiController]
    [Route("[controller]")]


    public class CalcController : ControllerBase
    {
      
        private readonly ILogger<CalcController> _logger;

        private readonly OpSelectors ops;

        public CalcController(ILogger<CalcController> logger)
        {
            _logger = logger;
            ops = new OpSelectors();
        }

        [HttpGet]
        public char[] Get() {
            return ops.dict.Keys.ToArray<char>();
        }

        [HttpPost]
        public string Post([FromBody] AppData viewmodel) {
            ICalc calculator = ops.dict[viewmodel.op];
            calculator.x = viewmodel.x;
            calculator.y = viewmodel.y;
            Console.WriteLine(viewmodel.y);
            return calculator.result;
        }
       
        
   
    }


    public class AppData
    {
        public string x { get; set; }

        public string y { get; set; }

        public char op { get; set; }

    }
}


