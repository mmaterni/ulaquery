#!/usr/bin/env python
# coding: utf-8

import csv
import sys


def csv2list(path):
    rows = []
    with open(path, "r") as f:
        reader = csv.reader(f, delimiter='|')
        for row in reader:
            rows.append(row)
    for row in rows:
        print(row)


def csv2head(path):
    with open(path, "r") as f:
        reader = csv.reader(f, delimiter='|')
        row = next(reader)
        row = [x.upper() for x in row]
        for x in row:
            print(f"\"{x}\",")


def csvslice(path, out):
    rows = []
    with open(path, "r") as f:
        reader = csv.reader(f, delimiter='|')
        for row in reader:
            row = row[:8]
            rows.append(row)
    with open(out, "w", newline='') as f:
        writer = csv.writer(f, delimiter='|')
        for row in rows:
            writer.writerow(row)


if __name__ == "__main__":
    # pth = sys.argv[1]
    pth = "ula_data/data_export/dictionary.ula.csv"
    # csv2list(pth)
    # csv2head(pth)
    # csvslice(pth, "es0.csv")
    csv2list("es0.csv")
