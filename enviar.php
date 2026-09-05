<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Caminho para os arquivos do PHPMailer
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Pegar os dados do formulário
$nome    = $_POST['name']    ?? 'Não informado';
$email   = $_POST['email']   ?? 'Não informado';
$phone   = $_POST['phone']   ?? 'Não informado';
$service = $_POST['service'] ?? 'Não informado';
$message = $_POST['message'] ?? 'Não informado';

// Traduzir serviço para nome amigável
$servicos = [
    'site-institucional' => 'Site Institucional',
    'landing-page'       => 'Landing Page',
    'loja-virtual'       => 'Loja Virtual',
    'blog'               => 'Blog'
];
$servicoExibido = $servicos[$service] ?? $service;

// Instância do PHPMailer
$mail = new PHPMailer(true);

try {
    // Configurações do SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'weblinkstudiocontato@gmail.com';
    $mail->Password   = 'eomnzlxnbnnblijk'; // 🔐 Sua senha de aplicativo
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Quem envia e quem recebe
    $mail->setFrom($email, $nome);
    $mail->addAddress('weblinkstudiocontato@gmail.com', 'WebLink Studios');
    $mail->addReplyTo($email, $nome);

    // Conteúdo do e-mail
    $mail->isHTML(true);
    $mail->Subject = 'Nova mensagem do site - ' . $servicoExibido;

    $mail->Body = "
        <h2>Novo Lead do Site</h2>
        <p><strong>Nome:</strong> $nome</p>
        <p><strong>E-mail:</strong> <a href='mailto:$email'>$email</a></p>
        <p><strong>Telefone:</strong> $phone</p>
        <p><strong>Serviço solicitado:</strong> $servicoExibido</p>
        <p><strong>Mensagem:</strong><br>$message</p>
        <hr>
        <small><em>E-mail enviado pelo formulário do site WebLink Studios.</em></small>
    ";

    // ✅ Envia o e-mail
    $mail->send();

    // 🚀 Redireciona para a página de obrigado
    header('Location: https://weblinkstudio.com.br/obrigado');
    exit; // Sempre use exit após header()

} catch (Exception $e) {
    // Em caso de erro, você pode ver o erro no navegador (ou logar)
    echo "Falha ao enviar mensagem. Por favor, tente novamente.";
    // Descomente abaixo só para testes (não deixe em produção):
    // echo "Mailer Error: {$mail->ErrorInfo}";
}
?>