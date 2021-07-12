using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace calc
{
    public class OpSelectors
    {
        public OpSelectors()
        {
            dict = createDict();
        }
        public  Dictionary<char, ICalc> dict { get; }



        private static IEnumerable<Type> GetAllTypesThatImplementInterface<T>()
        {
            return System.Reflection.Assembly.GetExecutingAssembly()
                .GetTypes()
                .Where(type => typeof(T).IsAssignableFrom(type) && !type.IsInterface);
        }


        private static Dictionary<char, ICalc> createDict()
        {
            Dictionary<char, ICalc> dict = new Dictionary<char, ICalc>();
            foreach (var type in GetAllTypesThatImplementInterface<ICalc>())
            {
                var instance = (ICalc)Activator.CreateInstance(type);
                dict.Add(instance.op, instance);
            }
            return dict;
        }

    }
}
