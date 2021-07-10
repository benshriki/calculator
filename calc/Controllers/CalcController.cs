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
        private static IEnumerable<Type> GetAllTypesThatImplementInterface<T>()
        {
            return System.Reflection.Assembly.GetExecutingAssembly()
                .GetTypes()
                .Where(type => typeof(T).IsAssignableFrom(type) && !type.IsInterface);
        }


        private static Dictionary<char, ICalc> createDict() {
            Dictionary<char, ICalc> dict = new Dictionary<char, ICalc>();
            foreach (var type in GetAllTypesThatImplementInterface<ICalc>())
            {
                var instance = (ICalc)Activator.CreateInstance(type);
                dict.Add(instance.op, instance);
            }
            return dict;
        }
        private readonly Dictionary<char, ICalc> ops = createDict();
        private readonly ILogger<CalcController> _logger;

        public CalcController(ILogger<CalcController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public char[] Get() {
            return ops.Keys.ToArray<char>();
        }

        [HttpPost]
        public string Post([FromBody] AppData viewmodel) {
            ICalc calculator = ops[viewmodel.op];
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


