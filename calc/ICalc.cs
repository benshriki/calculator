using System;


    public interface ICalc
    {
        public string x { get; set; }

        public string y { get; set; }

        public char op { get; }

        public string result => Calculate();

        public string Calculate();
    }




