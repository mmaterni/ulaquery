#!/usr/bin/env python
# coding: utf-8

import csv
import sys


def csv2list(path):
    rows = []
    with open(path, "r") as f:
        reader = csv.reader(f,delimiter='|')
        for row in reader:
            rows.append(row)
    for row in rows:
        print(row)


if __name__ == "__main__":
    pth = sys.argv[1]
    csv2list(pth)