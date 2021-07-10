using System;

namespace calc
{
    public class MulCalc : ICalc
    {
        public MulCalc() {
            op = '*';
        }
        public string x { get; set; }

        public string y { get; set; }

        public string result => Calculate();

        public char op { get; }


        public string Calculate() {  
            int ix = int.Parse(x);
            int iy = int.Parse(y);
            return (ix * iy).ToString();
        }
    }
}

