# run query 120 times quickly
for i in {1..60}; do
    # ./tools/q -s 127.0.0.1:5353 -t A -S -q baidu.com
    # ./tools/q -s 127.0.0.1:5353 -t A -w -q baidu.com
    # reverse query
    # ./tools/q -s 127.0.0.1:5353 -x -t PTR -q 127.0.0.1
    ./tools/q -s 127.0.0.1:5353 -t A --timeout 1s -q baidu.com
done
