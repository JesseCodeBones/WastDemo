

wast2wasm:prepare
	wat2wasm /home/jesse/workspace/WastDemo/01simple/table.wast -o /home/jesse/workspace/WastDemo/target/simple.wasm

prepare:clean
	mkdir target

clean:
	rm -fr target