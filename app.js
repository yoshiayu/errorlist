new Vue({
    el: '#app', // VueインスタンスをHTMLの#app要素にマウントする
    data: {
        searchQuery: '', // ユーザーの検索クエリを保持するデータプロパティ
        showToast: false, // トースト通知の表示状態
        errors: [
            // エラーリストをここに追加
            { name: '100 Continue', cause: 'サーバーがリクエストの最初の部分を受け取り、クライアントにリクエストの残りを送るよう指示しています。', solution: 'クライアントはリクエストの残りを送信する必要があります。例えば、フォームの送信時にサーバーから100 Continueが返された場合、クライアントは残りのデータを送信し続けるべきです。', userSolution: '' },
            { name: '101 Switching Protocols', cause: 'サーバーがクライアントの要求に応じてプロトコルの変更を受け入れました。', solution: 'サーバーとクライアントは新しいプロトコルを使用して通信を続けます。例えば、HTTPからWebSocketへのアップグレードを行う場合、クライアントは新しいプロトコルに従って通信を続けます。', userSolution: '' },
            { name: '102 Processing', cause: 'サーバーがリクエストを処理中であり、まだ完了していません。', solution: 'クライアントはサーバーがリクエストを完了するまで待ちます。例えば、大量のデータを処理する際にサーバーから102 Processingが返された場合、クライアントは処理が完了するまで待機します。', userSolution: '' },
            // 200番台エラー
            { name: '200 OK', cause: 'リクエストが成功し、サーバーが要求されたリソースを返しました。', solution: 'クライアントは返されたリソースを処理します。例えば、APIリクエストに対して200 OKが返された場合、クライアントは受け取ったデータを利用します。', userSolution: '' },
            { name: '201 Created', cause: 'リクエストが成功し、サーバーが新しいリソースを作成しました。', solution: 'クライアントは新しいリソースのURIを使用します。例えば、新しいユーザーアカウントが作成された場合、クライアントは新しいアカウントのURIを利用して操作を続行します。', userSolution: '' },
            { name: '202 Accepted', cause: 'リクエストが受け付けられましたが、処理はまだ完了していません。', solution: 'クライアントは後でリクエストの処理結果を確認します。例えば、非同期で処理されるバッチジョブのリクエストを送信した場合、クライアントは後で結果を確認します。', userSolution: '' },
            { name: '203 Non-Authoritative Information', cause: 'リクエストは成功しましたが、他のソースからの情報が含まれています。', solution: 'クライアントは返された情報が信頼できるかどうかを確認します。例えば、キャッシュプロキシからの応答で203 Non-Authoritative Informationが返された場合、クライアントは情報の信頼性を確認します。', userSolution: '' },
            { name: '204 No Content', cause: 'リクエストは成功しましたが、返すコンテンツがありません。', solution: 'クライアントは追加の動作を必要としません。例えば、データ削除リクエストに対して204 No Contentが返された場合、クライアントは操作が成功したとみなします。', userSolution: '' },
            { name: '205 Reset Content', cause: 'リクエストは成功し、ユーザーエージェントはリセットする必要があります。', solution: 'クライアントは現在の表示をリセットします。例えば、フォームの再送信を防ぐために、フォーム入力フィールドをリセットします。', userSolution: '' },
            { name: '206 Partial Content', cause: 'サーバーが部分的なコンテンツを返しました（範囲リクエスト）。', solution: 'クライアントは返された部分コンテンツを処理します。例えば、大きなファイルを部分的にダウンロードする場合、クライアントは各部分を結合して完全なファイルを再構築します。', userSolution: '' },
            // 300番台エラー
            { name: '300 Multiple Choices', cause: 'サーバーが複数のリソースから選択するように指示しています。', solution: 'クライアントはリソースを選択し、リクエストを再送信します。例えば、複数の形式で提供されるリソースのうち、適切な形式を選択します。', userSolution: '' },
            { name: '301 Moved Permanently', cause: 'リクエストされたリソースが永久に新しい場所に移動しました。', solution: 'クライアントは新しいURIにリクエストを送信します。例えば、旧URLが新URLにリダイレクトされる場合、クライアントは今後新URLを使用します。', userSolution: '' },
            { name: '302 Found', cause: 'リクエストされたリソースが一時的に新しい場所に移動しました。', solution: 'クライアントは一時的なURIにリクエストを送信します。例えば、一時的なメンテナンスのためにリソースが移動された場合、クライアントは一時的なURIを使用します。', userSolution: '' },
            { name: '303 See Other', cause: '他の場所でリソースが見つかりました。', solution: 'クライアントは指定されたURIにリクエストを送信します。例えば、POSTリクエスト後に結果をGETリクエストで取得する場合、クライアントは新しいURIにリクエストを送信します。', userSolution: '' },
            { name: '304 Not Modified', cause: 'リソースが変更されていません（キャッシュの利用）。', solution: 'クライアントはキャッシュされたリソースを使用します。例えば、リソースが変更されていない場合、クライアントはサーバーからの新しいデータをダウンロードせずにキャッシュを利用します。', userSolution: '' },
            { name: '305 Use Proxy', cause: 'リクエストはプロキシを使用する必要があります。', solution: 'クライアントは指定されたプロキシを使用します。例えば、企業の内部ネットワークでアクセスする場合、指定されたプロキシを経由してリクエストを送信します。', userSolution: '' },
            { name: '307 Temporary Redirect', cause: 'リクエストされたリソースが一時的に移動しました。', solution: 'クライアントは一時的なURIにリクエストを送信します。例えば、リソースが一時的に異なる場所に移動された場合、クライアントは新しいURIを使用します。', userSolution: '' },
            { name: '308 Permanent Redirect', cause: 'リクエストされたリソースが永久に移動しました。', solution: 'クライアントは新しいURIにリクエストを送信します。例えば、リソースの恒久的な移動があった場合、クライアントは今後新しいURIを使用します。', userSolution: '' },
            // 400番台エラー
            { name: '400 Bad Request', cause: 'サーバーがリクエストを理解できません。リクエストにエラーがあります。', solution: 'クライアントはリクエストを修正して再送信します。例えば、欠陥のあるJSONを送信する場合、クライアントはJSONの形式を修正して再送信します。', userSolution: '' },
            { name: '401 Unauthorized', cause: '認証が必要です。適切な認証情報が提供されていません。', solution: 'クライアントは認証情報を提供します。例えば、ログインが必要なAPIにアクセスする場合、クライアントは有効なトークンを提供します。', userSolution: '' },
            { name: '402 Payment Required', cause: '現在未使用ですが、将来的に利用される可能性があります。', solution: '現在は特定のアクションを必要としません。', userSolution: '' },
            { name: '403 Forbidden', cause: 'サーバーがリクエストを拒否しています。', solution: 'クライアントは別のリクエストを送信するか、アクセス権を確認します。例えば、アクセス権がないリソースにアクセスしようとする場合、クライアントは適切な権限を確認します。', userSolution: '' },
            { name: '404 Not Found', cause: 'リクエストされたリソースが見つかりません。', solution: 'クライアントはリクエストURIを確認します。例えば、存在しないエンドポイントにアクセスしようとする場合、クライアントは正しいURIを確認します。', userSolution: '' },
            { name: '405 Method Not Allowed', cause: 'リクエストメソッドが許可されていません。', solution: 'クライアントは許可されたメソッドを使用します。例えば、GETメソッドのみ許可されているエンドポイントに対してPOSTリクエストを送信しようとする場合、クライアントはGETメソッドを使用します。', userSolution: '' },
            { name: '406 Not Acceptable', cause: 'サーバーがリクエストの内容を生成できません。', solution: 'クライアントはAcceptヘッダーを修正します。例えば、サーバーが指定されたメディアタイプを生成できない場合、クライアントはAcceptヘッダーを変更します。', userSolution: '' },
            { name: '407 Proxy Authentication Required', cause: 'プロキシ認証が必要です。', solution: 'クライアントはプロキシ認証情報を提供します。例えば、プロキシサーバーを経由する場合、クライアントは必要な認証情報を提供します。', userSolution: '' },
            { name: '408 Request Timeout', cause: 'リクエストがタイムアウトしました。', solution: 'クライアントはリクエストを再送信します。例えば、ネットワークの遅延によってリクエストがタイムアウトした場合、クライアントは再度リクエストを送信します。', userSolution: '' },
            { name: '409 Conflict', cause: 'リクエストがサーバーの現在の状態と競合しています。', solution: 'クライアントは競合を解決してリクエストを再送信します。例えば、同じリソースを複数のユーザーが同時に更新しようとする場合、クライアントは競合を解決します。', userSolution: '' },
            { name: '410 Gone', cause: 'リクエストされたリソースが永久に利用できません。', solution: 'クライアントは別のリソースをリクエストします。例えば、廃止されたAPIエンドポイントにアクセスしようとする場合、クライアントは新しいエンドポイントを使用します。', userSolution: '' },
            { name: '411 Length Required', cause: 'リクエストにContent-Lengthヘッダーが必要です。', solution: 'クライアントはContent-Lengthヘッダーを追加します。例えば、POSTリクエストを送信する場合、クライアントはリクエストボディの長さを指定します。', userSolution: '' },
            { name: '412 Precondition Failed', cause: 'リクエストの前提条件が満たされていません。', solution: 'クライアントは前提条件を修正します。例えば、If-Matchヘッダーを使用して競合を回避しようとする場合、クライアントは条件を修正します。', userSolution: '' },
            { name: '413 Payload Too Large', cause: 'リクエストのペイロードが大きすぎます。', solution: 'クライアントはペイロードを小さくします。例えば、アップロードするファイルのサイズを小さくするか、圧縮します。', userSolution: '' },
            { name: '414 URI Too Long', cause: 'URIが長すぎます。', solution: 'クライアントは短いURIを使用します。例えば、クエリパラメータを短くするか、POSTリクエストを使用してデータを送信します。', userSolution: '' },
            { name: '415 Unsupported Media Type', cause: 'メディアタイプがサポートされていません。', solution: 'クライアントはサポートされているメディアタイプを使用します。例えば、サーバーがJSONをサポートしている場合、クライアントはJSONを送信します。', userSolution: '' },
            { name: '416 Range Not Satisfiable', cause: 'リクエストされた範囲が無効です。', solution: 'クライアントは有効な範囲を指定します。例えば、ファイルのダウンロード範囲がファイルサイズを超えている場合、クライアントは有効な範囲を指定します。', userSolution: '' },
            { name: '417 Expectation Failed', cause: 'Expectヘッダーの前提条件が満たされていません。', solution: 'クライアントはExpectヘッダーを修正します。例えば、サーバーが100-continueをサポートしていない場合、クライアントはExpectヘッダーを削除します。', userSolution: '' },
            { name: '418 I\'m a teapot', cause: 'エイプリルフールのジョークとして定義されたステータスコードです。', solution: '特定のアクションは不要です。', userSolution: '' },
            { name: '421 Misdirected Request', cause: 'リクエストが適切なサーバーに送信されていません。', solution: 'クライアントは正しいサーバーにリクエストを送信します。例えば、複数のサーバーが同じIPを共有している場合、クライアントは適切なサーバーにリクエストを送信します。', userSolution: '' },
            { name: '422 Unprocessable Entity', cause: 'リクエストの形式は正しいが、処理できません。', solution: 'クライアントはリクエストの内容を修正します。例えば、JSONスキーマバリデーションに失敗した場合、クライアントはリクエストデータを修正します。', userSolution: '' },
            { name: '423 Locked', cause: 'リソースがロックされています。', solution: 'クライアントはロックが解除されるまで待ちます。例えば、ファイルが別のプロセスによってロックされている場合、クライアントはロックが解除されるまで待機します。', userSolution: '' },
            { name: '424 Failed Dependency', cause: '前のリクエストが失敗したため、依存関係が満たされませんでした。', solution: 'クライアントは依存関係を解決してリクエストを再送信します。例えば、複数のリクエストが依存関係を持つ場合、最初のリクエストが成功するようにします。', userSolution: '' },
            { name: '425 Too Early', cause: 'リクエストが早すぎます。', solution: 'クライアントは適切なタイミングでリクエストを再送信します。例えば、セッションが確立される前にリクエストを送信する場合、クライアントはセッションの確立を待ちます。', userSolution: '' },
            { name: '426 Upgrade Required', cause: 'プロトコルのアップグレードが必要です。', solution: 'クライアントはプロトコルをアップグレードします。例えば、HTTPからHTTPSへのアップグレードが必要な場合、クライアントはHTTPSを使用します。', userSolution: '' },
            { name: '428 Precondition Required', cause: 'リクエストに前提条件が必要です。', solution: 'クライアントは前提条件を設定します。例えば、If-Matchヘッダーを使用して競合を回避する場合、クライアントは前提条件を設定します。', userSolution: '' },
            { name: '429 Too Many Requests', cause: 'リクエストの送信頻度が多すぎます。', solution: 'クライアントはリクエスト頻度を下げます。例えば、レートリミットを超えた場合、クライアントはリクエストの頻度を調整します。', userSolution: '' },
            { name: '431 Request Header Fields Too Large', cause: 'リクエストヘッダーが大きすぎます。', solution: 'クライアントはヘッダーのサイズを小さくします。例えば、長すぎるクッキーやヘッダーを削除します。', userSolution: '' },
            { name: '451 Unavailable For Legal Reasons', cause: '法的理由によりリクエストされたリソースが利用できません。', solution: 'クライアントは別のリソースをリクエストします。例えば、特定のコンテンツが法的に制限されている場合、クライアントは別のコンテンツをリクエストします。', userSolution: '' },
            // 500番台エラー
            { name: '500 Internal Server Error', cause: 'サーバー内部で予期しないエラーが発生しました。', solution: 'サーバー管理者はログを確認し、エラーを修正します。例えば、データベース接続の問題やコードのバグを特定して修正します。', userSolution: '' },
            { name: '501 Not Implemented', cause: 'サーバーがリクエストされた機能をサポートしていません。', solution: 'クライアントはサーバーの機能を確認します。例えば、サーバーが特定のHTTPメソッドをサポートしていない場合、クライアントは別のメソッドを使用します。', userSolution: '' },
            { name: '502 Bad Gateway', cause: 'ゲートウェイまたはプロキシサーバーが不正なレスポンスを受け取りました。', solution: 'クライアントは後でリクエストを再送信します。例えば、ゲートウェイサーバーが過負荷の場合、クライアントは後で再試行します。', userSolution: '' },
            { name: '503 Service Unavailable', cause: 'サーバーが一時的に過負荷またはメンテナンス中です。', solution: 'クライアントは後でリクエストを再送信します。例えば、サーバーがメンテナンス中の場合、クライアントは後で再試行します。', userSolution: '' },
            { name: '504 Gateway Timeout', cause: 'ゲートウェイまたはプロキシサーバーがタイムアウトしました。', solution: 'クライアントは後でリクエストを再送信します。例えば、バックエンドサーバーが応答しない場合、クライアントは後で再試行します。', userSolution: '' },
            { name: '505 HTTP Version Not Supported', cause: 'サーバーがリクエストで使用されているHTTPプロトコルのバージョンをサポートしていません。', solution: 'クライアントはサポートされているHTTPバージョンを使用します。例えば、サーバーがHTTP/2をサポートしていない場合、クライアントはHTTP/1.1を使用します。', userSolution: '' },
            { name: '506 Variant Also Negotiates', cause: 'サーバー内部の構成エラーが発生しました。', solution: 'サーバー管理者は構成を修正します。例えば、サーバーのコンフィギュレーションに誤りがある場合、管理者は設定を修正します。', userSolution: '' },
            { name: '507 Insufficient Storage', cause: 'サーバーが要求を完了するのに十分なストレージを持っていません。', solution: 'サーバー管理者はストレージを増やします。例えば、ディスク容量が不足している場合、管理者は追加のストレージを提供します。', userSolution: '' },
            { name: '508 Loop Detected', cause: 'サーバーが無限ループを検出しました。', solution: 'サーバー管理者はループを修正します。例えば、リソース間で無限リダイレクトが発生している場合、管理者はリダイレクトルールを修正します。', userSolution: '' },
            { name: '510 Not Extended', cause: 'サーバーがリクエストを満たすために必要な拡張がありません。', solution: 'クライアントは必要な拡張を実装します。例えば、サーバーが特定の機能拡張を要求している場合、クライアントはそれを実装します。', userSolution: '' },
            { name: '511 Network Authentication Required', cause: 'ネットワークアクセスのための認証が必要です。', solution: 'クライアントは必要な認証情報を提供します。例えば、キャプティブポータルを通過するために認証が必要な場合、クライアントは認証情報を提供します。', userSolution: '' },
            // 他のJavaのエラー
            {
                name: 'AccessControlException',
                cause: 'セキュリティマネージャによってアクセスが拒否されました。例えば、読み取りアクセス権のないファイルにアクセスしようとした場合。',
                solution: 'セキュリティポリシーを確認し、必要な権限を設定します。適切なセキュリティ設定を行い、アクセス権を見直します。',
                code: `
System.setSecurityManager(new SecurityManager());
try {
    System.getProperty("user.home"); // AccessControlException
} catch (AccessControlException e) {
    System.out.println("Access denied: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ArrayIndexOutOfBoundsException',
                cause: '配列のインデックスが範囲外です。例えば、存在しないインデックスにアクセスしようとした場合。',
                solution: '配列のインデックスが0から始まることを確認し、インデックスが配列の長さ未満であることを確認してからアクセスします。',
                code: `
int[] array = new int[5];
try {
    for (int i = 0; i <= array.length; i++) {
        System.out.println(array[i]);
    }
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Index out of bounds: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ArrayStoreException',
                cause: '配列に不適切な型のオブジェクトを格納しようとしました。例えば、整数を文字列配列に格納しようとした場合。',
                solution: '配列に格納するオブジェクトが配列の型と一致していることを確認します。',
                code: `
Object[] objArray = new String[5];
try {
    objArray[0] = "String"; // OK
    objArray[1] = 10; // ArrayStoreException
} catch (ArrayStoreException e) {
    System.out.println("Invalid array store: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'AssertionError',
                cause: 'アサーションが失敗しました。例えば、期待される条件がfalseである場合。',
                solution: 'アサーション条件を見直し、必要に応じて条件を修正します。',
                code: `
int x = 1;
try {
    assert x == 0 : "x should be 0";
} catch (AssertionError e) {
    System.out.println("Assertion failed: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'AuthenticationException (Spring Security)',
                cause: '認証に失敗しました。例えば、間違ったユーザー名やパスワードが提供された場合。',
                solution: '認証情報を確認し、適切なユーザー名とパスワードを提供します。',
                code: `
try {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken("user", "wrongpassword"));
} catch (AuthenticationException e) {
    System.out.println("Authentication failed: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'AutowiredAnnotationBeanPostProcessor',
                cause: 'Springコンテナが依存関係を解決できない。例えば、@Autowiredフィールドに対するBeanが定義されていない場合。',
                solution: '@Autowiredフィールドの型とBeanの定義が一致していることを確認します。',
                code: `
@Autowired
private MyService myService; // MyServiceのBeanが存在しない場合エラー
                `,
                userSolution: ''
            },
            {
                name: 'ApplicationContextException',
                cause: 'Springのアプリケーションコンテキストの初期化に失敗しました。例えば、必要なBean定義が見つからない場合。',
                solution: 'アプリケーションコンテキストの設定を確認し、必要なBeanが定義されていることを確認します。',
                code: `
try {
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
} catch (ApplicationContextException e) {
    System.out.println("Context initialization failed: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'BufferOverflowException',
                cause: 'バッファの容量を超えて書き込みを試みた。例えば、バッファのサイズ以上のデータを書き込もうとした場合。',
                solution: '書き込むデータ量がバッファ容量内に収まるようにします。',
                code: `
ByteBuffer buffer = ByteBuffer.allocate(10);
try {
    buffer.put(new byte[11]); // BufferOverflowException
} catch (BufferOverflowException e) {
    System.out.println("Buffer overflow: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'BufferUnderflowException',
                cause: 'バッファから読み取るデータが不足している。例えば、バッファのデータが不足している状態で読み取りを試みた場合。',
                solution: '十分なデータがバッファにあることを確認してから読み取ります。',
                code: `
ByteBuffer buffer = ByteBuffer.allocate(10);
buffer.put(new byte[5]);
buffer.flip();
try {
    buffer.get(new byte[6]); // BufferUnderflowException
} catch (BufferUnderflowException e) {
    System.out.println("Buffer underflow: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'BindException',
                cause: 'アドレスやポートが既に使用されているため、バインドできない。例えば、同じポートで複数のサーバーを起動しようとした場合。',
                solution: '別のポートを使用するか、現在使用しているポートを解放します。',
                code: `
try {
    ServerSocket serverSocket = new ServerSocket(8080);
} catch (BindException e) {
    System.out.println("Port already in use: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ClassCastException',
                cause: 'オブジェクトを不適切な型にキャストしようとした。例えば、文字列を整数にキャストしようとした場合。',
                solution: 'インスタンスが期待される型であることを確認します。',
                code: `
Object obj = "String";
try {
    Integer number = (Integer) obj; // ClassCastException
} catch (ClassCastException e) {
    System.out.println("Invalid cast: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ClassNotFoundException',
                cause: 'クラスが見つからない。例えば、指定されたクラスがクラスパスに存在しない場合。',
                solution: 'クラスパスを確認し、クラスが存在することを確認します。',
                code: `
try {
    Class.forName("com.example.MyClass");
} catch (ClassNotFoundException e) {
    System.out.println("Class not found: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'CloneNotSupportedException',
                cause: 'Cloneableインターフェースを実装していないクラスのインスタンスをクローンしようとした。例えば、クローン可能なクラスではないオブジェクトをクローンしようとした場合。',
                solution: 'Cloneableインターフェースを実装します。',
                code: `
class MyClass implements Cloneable {
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
try {
    MyClass obj = new MyClass();
    MyClass clonedObj = (MyClass) obj.clone();
} catch (CloneNotSupportedException e) {
    System.out.println("Clone not supported: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ConcurrentModificationException',
                cause: 'コレクションが不正に変更された。例えば、コレクションのイテレーション中にコレクションを変更した場合。',
                solution: 'コレクションの変更操作を適切に同期します。',
                code: `
List<String> list = new ArrayList<>();
list.add("one");
try {
    for (String item : list) {
        list.add("two"); // ConcurrentModificationException
    }
} catch (ConcurrentModificationException e) {
    System.out.println("Concurrent modification: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ConnectException',
                cause: 'サーバーに接続できない。例えば、指定されたホストやポートが無効な場合。',
                solution: 'サーバーの状態を確認し、接続情報が正しいことを確認します。',
                code: `
try {
    Socket socket = new Socket("localhost", 8080);
} catch (ConnectException e) {
    System.out.println("Connection failed: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ClassFormatError',
                cause: 'クラスファイルの形式が不正。例えば、クラスファイルが破損している場合。',
                solution: 'クラスファイルが正しくコンパイルされていることを確認します。',
                code: `
try {
    ClassLoader.getSystemClassLoader().loadClass("InvalidClass");
} catch (ClassFormatError e) {
    System.out.println("Invalid class format: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'CannotCreateTransactionException (Spring)',
                cause: 'トランザクションの作成に失敗した。例えば、データベース接続に失敗した場合。',
                solution: 'データベース接続やトランザクションマネージャの設定を確認します。',
                code: `
try {
    transactionManager.getTransaction(new DefaultTransactionDefinition());
} catch (CannotCreateTransactionException e) {
    System.out.println("Cannot create transaction: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ConversionNotSupportedException (Spring)',
                cause: '指定された型への変換がサポートされていない。例えば、変換可能な型ではない場合。',
                solution: '変換可能な型を使用するか、カスタムコンバーターを実装します。',
                code: `
String dateStr = "2021-01-01";
try {
    LocalDate date = conversionService.convert(dateStr, LocalDate.class); // ConversionNotSupportedException
} catch (ConversionNotSupportedException e) {
    System.out.println("Conversion not supported: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'DataAccessException (Spring)',
                cause: 'データアクセス操作中にエラーが発生。例えば、データベースクエリが失敗した場合。',
                solution: 'データベースの状態やSQLクエリを確認します。',
                code: `
try {
    jdbcTemplate.queryForObject("SELECT * FROM nonexistent_table", String.class);
} catch (DataAccessException e) {
    System.out.println("Data access error: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'DataIntegrityViolationException (Spring)',
                cause: 'データの整合性制約が違反された。例えば、主キーの重複が発生した場合。',
                solution: 'データの整合性を確認し、制約に違反しないようにデータを修正します。',
                code: `
try {
    jdbcTemplate.update("INSERT INTO users (id, name) VALUES (1, 'John')");
    jdbcTemplate.update("INSERT INTO users (id, name) VALUES (1, 'Doe')"); // DataIntegrityViolationException
} catch (DataIntegrityViolationException e) {
    System.out.println("Data integrity violation: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'DispatcherServletException (Spring MVC)',
                cause: 'SpringのDispatcherServletの初期化または処理中にエラーが発生。例えば、コントローラーの設定が間違っている場合。',
                solution: 'コントローラーの設定やリクエストマッピングを確認します。',
                code: `
@Controller
public class MyController {
    @RequestMapping("/home")
    public String home() {
        return "home";
    }
}
                `,
                userSolution: ''
            },
            {
                name: 'EOFException',
                cause: '入力の終わりに達した。例えば、ファイルの終わりに到達した場合。',
                solution: '入力データの完全性を確認します。',
                code: `
try {
    DataInputStream in = new DataInputStream(new FileInputStream("file.txt"));
    while (true) {
        int data = in.readInt();
    }
} catch (EOFException e) {
    System.out.println("End of file reached: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'EnumConstantNotPresentException',
                cause: '列挙型に存在しない定数にアクセスしようとした。例えば、無効な列挙型定数を指定した場合。',
                solution: '列挙型の定数が正しいことを確認します。',
                code: `
enum MyEnum { ONE, TWO }
try {
    MyEnum value = MyEnum.valueOf("THREE"); // EnumConstantNotPresentException
} catch (EnumConstantNotPresentException e) {
    System.out.println("Invalid enum constant: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ExecutionException',
                cause: '非同期タスクの実行中にエラーが発生。例えば、非同期タスクが例外をスローした場合。',
                solution: 'タスクの実行内容を確認し、エラーの原因を特定します。',
                code: `
ExecutorService executor = Executors.newSingleThreadExecutor();
Future<Integer> future = executor.submit(() -> {
    throw new RuntimeException("Error");
});
try {
    future.get(); // ExecutionException
} catch (ExecutionException e) {
    System.out.println("Task execution failed: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ExceptionInInitializerError',
                cause: 'クラスの初期化中に例外がスローされた。例えば、staticブロック内で例外が発生した場合。',
                solution: 'クラス初期化コードを確認し、例外の原因を特定します。',
                code: `
class MyClass {
    static {
        int x = 1 / 0; // ExceptionInInitializerError
    }
}
try {
    MyClass obj = new MyClass();
} catch (ExceptionInInitializerError e) {
    System.out.println("Initialization error: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'EmptyResultDataAccessException (Spring)',
                cause: 'データベースクエリで結果が見つからなかった。例えば、期待する結果がデータベースに存在しない場合。',
                solution: 'クエリが正しいことを確認し、結果が存在することを確認します。',
                code: `
try {
    String name = jdbcTemplate.queryForObject("SELECT name FROM users WHERE id = 1", String.class);
} catch (EmptyResultDataAccessException e) {
    System.out.println("No result found: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'FileNotFoundException',
                cause: '指定されたファイルが見つからない。例えば、存在しないファイルにアクセスしようとした場合。',
                solution: 'ファイルのパスを確認し、ファイルが存在することを確認します。',
                code: `
try {
    FileReader file = new FileReader("path/to/your/file.txt");
} catch (FileNotFoundException e) {
    // ファイルが見つからない場合の対策
    System.out.println("File not found: " + e.getMessage());
    // 例えば、ファイルが存在しない場合は、新しいファイルを作成する
    try {
        File newFile = new File("path/to/your/file.txt");
        if (newFile.createNewFile()) {
            System.out.println("New file created: " + newFile.getName());
        } else {
            System.out.println("File already exists.");
        }
    } catch (IOException ioException) {
        ioException.printStackTrace();
    }
}
                `,
                userSolution: ''
            },
            {
                name: 'FileSystemException',
                cause: 'ファイルシステムに関連する操作中にエラーが発生。例えば、ファイルの移動が失敗した場合。',
                solution: 'ファイルシステムの状態を確認し、操作が適切に行われていることを確認する。エラーメッセージに基づいて具体的な対策を講じる。',
                code: `
try {
    Files.move(Paths.get("path/to/source"), Paths.get("path/to/target"));
} catch (FileSystemException e) {
    // ファイルシステムエラーが発生した場合の対策
    System.out.println("File system error: " + e.getMessage());

    // エラーメッセージに基づいて対策を検討
    // 例: ファイルが使用中である場合の対策
    if (e.getReason().contains("The process cannot access the file because it is being used by another process")) {
        System.out.println("ファイルが別のプロセスによって使用されています。後でもう一度試してください。");
    }

    // 例: パーミッションの問題がある場合の対策
    if (e.getReason().contains("Permission denied")) {
        System.out.println("ファイルまたはディレクトリに対するアクセス権がありません。権限を確認してください。");
    }

    // その他の対策を追加...
}

                `,
                userSolution: ''
            },
            {
                name: 'HttpClientErrorException (Spring)',
                cause: 'クライアントエラーが発生（4xx）。例えば、無効なリクエストを送信した場合。',
                solution: 'リクエストが正しいことを確認し、エラーコードの原因を特定します。',
                code: `
try {
    restTemplate.getForObject("http://example.com/invalid-endpoint", String.class);
} catch (HttpClientErrorException e) {
    System.out.println("Client error: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'HttpServerErrorException (Spring)',
                cause: 'サーバーエラーが発生（5xx）。例えば、サーバー側でエラーが発生した場合。',
                solution: 'サーバーの状態を確認し、エラーコードの原因を特定します。',
                code: `
try {
    restTemplate.getForObject("http://example.com/trigger-error", String.class);
} catch (HttpServerErrorException e) {
    System.out.println("Server error: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'IllegalArgumentException',
                cause: 'メソッドに不正な引数が渡された。例えば、無効な値がメソッドに渡された場合。',
                solution: '引数が期待される範囲内であることを確認します。',
                code: `
void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("Age cannot be negative");
    }
}
try {
    setAge(-1);
} catch (IllegalArgumentException e) {
    System.out.println("Invalid argument: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'IllegalMonitorStateException',
                cause: 'モニターの状態が不正。例えば、同期されていないオブジェクトでwait()を呼び出した場合。',
                solution: '同期ブロック内でwait(), notify(), notifyAll()を呼び出します。',
                code: `
synchronized (this) {
    try {
        wait(); // IllegalMonitorStateException if not synchronized
    } catch (IllegalMonitorStateException e) {
        System.out.println("Illegal monitor state: " + e.getMessage());
    }
}
                `,
                userSolution: ''
            },
            {
                name: 'IllegalStateException',
                cause: 'オブジェクトが不正な状態にある。例えば、状態が不正な操作が試みられた場合。',
                solution: 'オブジェクトの状態を確認し、正しい状態で操作を行います。',
                code: `
List<String> list = new ArrayList<>();
try {
    list.iterator().remove(); // IllegalStateException
} catch (IllegalStateException e) {
    System.out.println("Illegal state: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'IllegalThreadStateException',
                cause: 'スレッドが不正な状態にある。例えば、既に開始されたスレッドを再度開始しようとした場合。',
                solution: 'スレッドの状態を確認し、適切に操作します。',
                code: `
Thread thread = new Thread();
thread.start();
try {
    thread.start(); // IllegalThreadStateException
} catch (IllegalThreadStateException e) {
    System.out.println("Illegal thread state: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'IndexOutOfBoundsException',
                cause: 'インデックスが範囲外。例えば、存在しないインデックスにアクセスしようとした場合。',
                solution: 'インデックスが有効な範囲内であることを確認します。',
                code: `
List<String> list = new ArrayList<>();
list.add("one");
try {
    String item = list.get(1); // IndexOutOfBoundsException
} catch (IndexOutOfBoundsException e) {
    System.out.println("Index out of bounds: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'InstantiationException',
                cause: '抽象クラスやインターフェースをインスタンス化しようとした。例えば、インターフェースを直接インスタンス化しようとした場合。',
                solution: '具象クラスのインスタンスを作成します。',
                code: `
Class<?> clazz = Class.forName("com.example.MyAbstractClass");
try {
    Object obj = clazz.newInstance(); // InstantiationException
} catch (InstantiationException e) {
    System.out.println("Cannot instantiate abstract class: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'InterruptedException',
                cause: 'スレッドが中断された。例えば、スリープ中のスレッドが中断された場合。',
                solution: 'スレッドの中断状態を確認し、適切に対処します。',
                code: `
try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
    System.out.println("Thread interrupted: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'InvocationTargetException',
                cause: 'メソッドの呼び出し中に例外がスローされた。例えば、リフレクションを使用してメソッドを呼び出した場合。',
                solution: '呼び出したメソッドの実装を確認し、例外の原因を特定します。',
                code: `
try {
    Method method = MyClass.class.getMethod("myMethod");
    method.invoke(new MyClass()); // InvocationTargetException
} catch (InvocationTargetException e) {
    System.out.println("Method invocation failed: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'IOException',
                cause: '入出力操作の失敗。例えば、ファイルの読み書き中にエラーが発生した場合。',
                solution: 'ファイルやネットワークの状態を確認します。',
                code: `
try {
    FileReader file = new FileReader("file.txt");
} catch (IOException e) {
    System.out.println("IO error: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'JarException',
                cause: 'JARファイルの処理中にエラーが発生。例えば、無効なJARファイルを処理しようとした場合。',
                solution: 'JARファイルが正しく作成されていることを確認します。',
                code: `
try {
    JarFile jarFile = new JarFile("invalid.jar");
} catch (JarException e) {
    System.out.println("JAR file error: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'JMException',
                cause: 'Java Management Extensions (JMX)操作中にエラーが発生。例えば、MBean操作中にエラーが発生した場合。',
                solution: 'JMXの設定と操作内容を確認します。',
                code: `
try {
    MBeanServer mbeanServer = ManagementFactory.getPlatformMBeanServer();
    ObjectName name = new ObjectName("com.example:type=MyMBean");
    mbeanServer.getMBeanInfo(name);
} catch (JMException e) {
    System.out.println("JMX error: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'MalformedURLException',
                cause: 'URLの形式が不正。例えば、無効な形式のURLを使用した場合。',
                solution: '正しい形式のURLを使用します。',
                code: `
try {
    URL url = new URL("malformedurl");
} catch (MalformedURLException e) {
    System.out.println("Malformed URL: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'MissingResourceException',
                cause: 'リソースが見つからない。例えば、指定されたリソースが存在しない場合。',
                solution: 'リソースのパスや名前を確認します。',
                code: `
try {
    ResourceBundle bundle = ResourceBundle.getBundle("nonexistent");
} catch (MissingResourceException e) {
    System.out.println("Resource not found: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'MethodArgumentNotValidException (Spring)',
                cause: 'メソッド引数がバリデーションに失敗した。例えば、無効なデータがメソッドに渡された場合。',
                solution: '引数がバリデーション条件を満たしていることを確認します。',
                code: `
@PostMapping("/addUser")
public ResponseEntity<String> addUser(@Valid @RequestBody User user) throws MethodArgumentNotValidException {
    // Validation failed if user is invalid
}
                `,
                userSolution: ''
            },
            {
                name: 'NegativeArraySizeException',
                cause: '配列のサイズが負の数。例えば、負のサイズで配列を作成しようとした場合。',
                solution: '配列のサイズが正の数であることを確認します。',
                code: `
int size = -1;
try {
    int[] array = new int[size]; // NegativeArraySizeException
} catch (NegativeArraySizeException e) {
    System.out.println("Invalid array size: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'NoClassDefFoundError',
                cause: 'クラスファイルが見つからない。例えば、実行時にクラスが見つからない場合。',
                solution: 'クラスパスを確認し、クラスファイルが存在することを確認します。',
                code: `
try {
    Class.forName("com.example.MyClass");
} catch (NoClassDefFoundError e) {
    System.out.println("Class not found: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'NoSuchElementException',
                cause: '存在しない要素にアクセスしようとした。例えば、コレクションが空の場合に要素を取得しようとした場合。',
                solution: '要素が存在することを確認してからアクセスします。',
                code: `
List<String> list = new ArrayList<>();
Iterator<String> iterator = list.iterator();
try {
    String item = iterator.next(); // NoSuchElementException
} catch (NoSuchElementException e) {
    System.out.println("Element not found: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'NoSuchFieldException',
                cause: 'クラスに存在しないフィールドにアクセスしようとした。例えば、無効なフィールド名を使用した場合。',
                solution: 'フィールド名が正しいことを確認します。',
                code: `
class MyClass {
    private int field;
}
try {
    Field field = MyClass.class.getField("nonexistentField");
} catch (NoSuchFieldException e) {
    System.out.println("Field not found: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'NoSuchMethodException',
                cause: 'クラスに存在しないメソッドにアクセスしようとした。例えば、無効なメソッド名を使用した場合。',
                solution: 'メソッド名とパラメータが正しいことを確認します。',
                code: `
class MyClass {
    public void myMethod() {}
}
try {
    Method method = MyClass.class.getMethod("nonexistentMethod");
} catch (NoSuchMethodException e) {
    System.out.println("Method not found: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'NullPointerException',
                cause: 'nullオブジェクトにアクセスしようとした。例えば、null参照にアクセスしようとした場合。',
                solution: 'オブジェクトがnullでないことを確認してからアクセスします。',
                code: `
String str = null;
try {
    if (str != null) {
        System.out.println(str.length());
    }
} catch (NullPointerException e) {
    System.out.println("Null pointer access: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'NumberFormatException',
                cause: '数値に変換できない文字列。例えば、文字列を整数に変換しようとした場合。',
                solution: '数値に変換可能な文字列を入力するか、try-catchで例外処理を行います。',
                code: `
try {
    int number = Integer.parseInt("not_a_number");
} catch (NumberFormatException e) {
    System.out.println("Invalid number format: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'OutOfMemoryError',
                cause: 'メモリが不足している。例えば、大量のデータをメモリにロードしようとした場合。',
                solution: '使用メモリを減らすか、JVMに割り当てるメモリを増やします。',
                code: `
try {
    byte[] array = new byte[Integer.MAX_VALUE];
} catch (OutOfMemoryError e) {
    System.out.println("Out of memory: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'OverlappingFileLockException',
                cause: 'ファイルロックが重複している。例えば、同じファイルに対して複数のロックを取得しようとした場合。',
                solution: 'ファイルロックが重複しないように制御します。',
                code: `
try {
    FileChannel channel = new RandomAccessFile("file.txt", "rw").getChannel();
    FileLock lock1 = channel.lock();
    FileLock lock2 = channel.lock(); // OverlappingFileLockException
} catch (OverlappingFileLockException e) {
    System.out.println("Overlapping file lock: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'PropertyVetoException',
                cause: 'プロパティの変更が拒否された。例えば、無効なプロパティ値を設定しようとした場合。',
                solution: 'プロパティの変更が許可されていることを確認します。',
                code: `
try {
    DataSource dataSource = new DataSource();
    dataSource.setLoginTimeout(10);
} catch (PropertyVetoException e) {
    System.out.println("Property veto: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'RejectedExecutionException',
                cause: 'スレッドプールが新しいタスクを拒否した。例えば、シャットダウンされたスレッドプールにタスクを追加しようとした場合。',
                solution: 'スレッドプールの設定を見直し、容量を増やします。',
                code: `
ExecutorService executor = Executors.newFixedThreadPool(1);
executor.shutdown();
try {
    executor.execute(() -> System.out.println("Task")); // RejectedExecutionException
} catch (RejectedExecutionException e) {
    System.out.println("Task rejected: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ResourceNotFoundException (Spring)',
                cause: '指定されたリソースが見つからない。例えば、クラスパスにリソースが存在しない場合。',
                solution: 'リソースのパスや存在を確認します。',
                code: `
try {
    Resource resource = resourceLoader.getResource("classpath:nonexistentfile.txt");
    resource.getInputStream(); // ResourceNotFoundException
} catch (ResourceNotFoundException e) {
    System.out.println("Resource not found: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'RuntimeException',
                cause: '実行時に発生する一般的な例外。例えば、予期しないエラーが発生した場合。',
                solution: '例外の原因を特定し、適切に対処します。',
                code: `
throw new RuntimeException("This is a runtime exception");
                `,
                userSolution: ''
            },
            {
                name: 'SecurityException',
                cause: 'セキュリティマネージャによって操作がブロックされた。例えば、不正な操作が試みられた場合。',
                solution: 'セキュリティポリシーを確認し、必要な権限を設定します。',
                code: `
System.setSecurityManager(new SecurityManager());
try {
    System.exit(1); // SecurityException
} catch (SecurityException e) {
    System.out.println("Security violation: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'SocketException',
                cause: 'ソケット操作の失敗。例えば、ソケットの作成や接続が失敗した場合。',
                solution: 'ネットワークの状態やソケット設定を確認します。',
                code: `
try {
    Socket socket = new Socket("localhost", 8080);
} catch (SocketException e) {
    System.out.println("Socket error: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'StackOverflowError',
                cause: '再帰呼び出しが深すぎる。例えば、無限再帰が発生した場合。',
                solution: '再帰呼び出しのベースケースを適切に設定します。',
                code: `
public void recursiveMethod() {
    try {
        recursiveMethod(); // StackOverflowError
    } catch (StackOverflowError e) {
        System.out.println("Stack overflow: " + e.getMessage());
    }
}
                `,
                userSolution: ''
            },
            {
                name: 'StringIndexOutOfBoundsException',
                cause: '文字列のインデックスが範囲外。例えば、無効なインデックスにアクセスしようとした場合。',
                solution: 'インデックスが有効な範囲内であることを確認します。',
                code: `
String str = "example";
try {
    char ch = str.charAt(10); // StringIndexOutOfBoundsException
} catch (StringIndexOutOfBoundsException e) {
    System.out.println("String index out of bounds: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'SQLException',
                cause: 'データベース操作中にエラーが発生。例えば、SQLクエリが失敗した場合。',
                solution: 'SQLクエリやデータベースの状態を確認します。',
                code: `
try {
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost/test", "user", "password");
    Statement statement = connection.createStatement();
    statement.executeQuery("SELECT * FROM nonexistent_table"); // SQLException
} catch (SQLException e) {
    System.out.println("SQL error: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ServletException (JSP/Servlet)',
                cause: 'サーブレットの処理中にエラーが発生。例えば、リクエスト処理中に例外がスローされた場合。',
                solution: 'サーブレットの実装を確認し、エラーの原因を特定します。',
                code: `
@WebServlet("/example")
public class ExampleServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        throw new ServletException("Error processing request");
    }
}
                `,
                userSolution: ''
            },
            {
                name: 'SQLTimeoutException',
                cause: 'データベースクエリの実行がタイムアウトした。例えば、クエリが実行時間を超過した場合。',
                solution: 'クエリの実行時間を見直し、タイムアウト設定を調整します。',
                code: `
try {
    Statement stmt = connection.createStatement();
    stmt.setQueryTimeout(30); // seconds
    ResultSet rs = stmt.executeQuery("SELECT * FROM slow_table");
} catch (SQLTimeoutException e) {
    System.out.println("SQL timeout: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'TimeoutException',
                cause: '操作が指定時間内に完了しなかった。例えば、非同期タスクがタイムアウトした場合。',
                solution: 'タイムアウト時間を調整するか、操作を最適化します。',
                code: `
ExecutorService executor = Executors.newSingleThreadExecutor();
Future<String> future = executor.submit(() -> "result");
try {
    future.get(1, TimeUnit.SECONDS); // TimeoutException
} catch (TimeoutException e) {
    System.out.println("Operation timeout: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'TransactionSystemException (Spring)',
                cause: 'トランザクションシステムでエラーが発生。例えば、トランザクションのコミットが失敗した場合。',
                solution: 'トランザクションの設定とデータベースの状態を確認します。',
                code: `
try {
    transactionManager.commit(status); // TransactionSystemException
} catch (TransactionSystemException e) {
    System.out.println("Transaction error: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'TypeNotPresentException',
                cause: '型が見つからない。例えば、存在しない型を使用しようとした場合。',
                solution: '型が存在することを確認します。',
                code: `
try {
    Class<?> clazz = Class.forName("com.example.NonExistentClass");
} catch (TypeNotPresentException e) {
    System.out.println("Type not found: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'UnsupportedOperationException',
                cause: 'サポートされていない操作を実行しようとした。例えば、変更不可能なリストに要素を追加しようとした場合。',
                solution: 'サポートされている操作を行うようにします。',
                code: `
List<String> list = Arrays.asList("one", "two");
try {
    list.add("three"); // UnsupportedOperationException
} catch (UnsupportedOperationException e) {
    System.out.println("Unsupported operation: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'UnknownHostException',
                cause: 'ホスト名が解決できない。例えば、無効なホスト名を使用した場合。',
                solution: '正しいホスト名を使用します。',
                code: `
try {
    InetAddress address = InetAddress.getByName("unknownhost");
} catch (UnknownHostException e) {
    System.out.println("Unknown host: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'URISyntaxException',
                cause: 'URIの構文が不正。例えば、無効な形式のURIを使用した場合。',
                solution: '正しい形式のURIを使用します。',
                code: `
try {
    URI uri = new URI("malformed:uri");
} catch (URISyntaxException e) {
    System.out.println("Invalid URI: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ValidationException (Spring)',
                cause: 'バリデーションに失敗した。例えば、無効なデータが検証された場合。',
                solution: 'バリデーション条件を満たすようにデータを修正します。',
                code: `
try {
    validator.validate(new User());
} catch (ValidationException e) {
    System.out.println("Validation error: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'VirtualMachineError',
                cause: 'JVMがリソース不足や内部エラーを検出。例えば、メモリ不足や内部エラーが発生した場合。',
                solution: 'リソースを確認し、必要に応じて増やすか、JVMの設定を調整します。',
                code: `
try {
    byte[] array = new byte[Integer.MAX_VALUE];
} catch (OutOfMemoryError e) {
    System.out.println("Out of memory: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'WebServiceException',
                cause: 'Webサービスの操作中にエラーが発生。例えば、Webサービスの呼び出しが失敗した場合。',
                solution: 'Webサービスの設定と操作内容を確認します。',
                code: `
try {
    QName serviceName = new QName("http://example.com/", "MyService");
    Service service = Service.create(serviceName);
    MyServicePort port = service.getPort(MyServicePort.class);
} catch (WebServiceException e) {
    System.out.println("Web service error: " + e.getMessage());
}
                `,
                userSolution: ''
            },
            {
                name: 'ZipException',
                cause: 'ZIPファイルの処理中にエラーが発生。例えば、無効なZIPファイルを処理しようとした場合。',
                solution: 'ZIPファイルが正しく作成されていることを確認します。',
                code: `
try {
    ZipFile zipFile = new ZipFile("corrupted.zip");
} catch (ZipException e) {
    System.out.println("ZIP file error: " + e.getMessage());
}
                `,
                userSolution: ''
            }
        ],
        filteredErrors: [] // フィルタリングされたエラーリストを保持するデータプロパティ
    },
    methods: {
        searchErrors() {
            const query = this.searchQuery.trim().toLowerCase();
            if (query === '') {
                this.filteredErrors = this.errors;
            } else {
                this.filteredErrors = this.errors.filter(error =>
                    error.name.toLowerCase().startsWith(query) ||
                    error.cause.toLowerCase().startsWith(query) ||
                    error.solution.toLowerCase().startsWith(query)
                );
            }
        },
        copyToClipboard(code) {
            const el = document.createElement('textarea');
            el.value = code.trim();
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            this.showToast = true;
            setTimeout(() => {
                this.showToast = false;
            }, 3000);
        },
        isHttpStatusCode(errorName) {
            const httpStatusCodes = ['100', '101', '102', '200', '201', '202', '203', '204', '205', '206', '300', '301', '302', '303', '304', '305', '307', '308', '400', '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411', '412', '413', '414', '415', '416', '417', '418', '421', '422', '423', '424', '425', '426', '428', '429', '431', '451', '500', '501', '502', '503', '504', '505', '506', '507', '508', '510', '511'];
            return httpStatusCodes.some(code => errorName.startsWith(code));
        },
        saveUserSolution(error) {
            localStorage.setItem(error.name, error.userSolution);
        },
        deleteUserSolution(error) {
            localStorage.removeItem(error.name);
            error.userSolution = '';
        },
        loadUserSolutions() {
            this.errors.forEach(error => {
                const userSolution = localStorage.getItem(error.name);
                if (userSolution) {
                    error.userSolution = userSolution;
                }
            });
        },
        scrollToTop() {
            console.log("scrollToTop called");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log("scrollToTop executed");
        },
        toggleBackToTopButton() {
            console.log("toggleBackToTopButton called");
            const backToTopButton = document.getElementById('back-to-top');
            const txtOutputButton = document.getElementById('txt-output');
            if (window.scrollY > 100) {
                backToTopButton.style.display = 'flex';
                txtOutputButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
                txtOutputButton.style.display = 'none';
            }
            console.log(`toggleBackToTopButton executed, display style: ${backToTopButton.style.display}`);
        },
        async generateTxt() {
            console.log("generateTxt called");
            let txtContent = '';

            this.errors.forEach((error) => {
                if (error.userSolution) {
                    txtContent += `エラー名: ${error.name}\n`;
                    txtContent += `ユーザー解決方法: ${error.userSolution}\n\n`;
                }
            });

            const blob = new Blob([txtContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'UserSolutions.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            console.log("generateTxt executed");
        }
    },
    mounted() {
        this.filteredErrors = this.errors;
        this.loadUserSolutions();
        window.addEventListener('scroll', this.toggleBackToTopButton);
        console.log("Vue instance mounted");
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.toggleBackToTopButton);
    }
});