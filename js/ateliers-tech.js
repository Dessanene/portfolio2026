// Script pour gérer l'affichage des documentations techniques et les téléchargements
document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const modal = document.getElementById('doc-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');
    const docLinks = document.querySelectorAll('.tech-doc-link');
    const downloadLinks = document.querySelectorAll('.tech-download-link');
    
    // Contenu des documentations (simulé)
    const documentations = {
        'lxc': {
            title: 'Installation de LXC',
            content: `
                <h3>Virtualisation légère sous Linux</h3>
                <p>LXC (Linux Containers) est une technologie de virtualisation au niveau du système d'exploitation qui permet d'exécuter plusieurs systèmes Linux isolés sur un seul hôte Linux.</p>
                
                <h3>Procédure d'installation</h3>
                <ol>
                    <li>Installation des paquets nécessaires</li>
                    <li>Configuration du réseau pour les conteneurs</li>
                    <li>Création et démarrage des conteneurs</li>
                    <li>Configuration des limites de ressources</li>
                </ol>
                
                <h3>Commandes principales</h3>
                <pre>
# Installation
sudo apt install lxc lxc-templates

# Création d'un conteneur
sudo lxc-create -t download -n mon-conteneur -- -d ubuntu -r focal -a amd64

# Démarrage d'un conteneur
sudo lxc-start -n mon-conteneur

# Accès au conteneur
sudo lxc-attach -n mon-conteneur
                </pre>
                
                <p>Cette technologie permet de déployer rapidement des environnements isolés avec une empreinte système minimale, contrairement à la virtualisation complète.</p>
            `
        },
        'lamp': {
            title: 'Installation de LAMP',
            content: `
                <h3>Environnement web complet</h3>
                <p>LAMP est un acronyme pour Linux, Apache, MySQL et PHP, une pile logicielle populaire pour le développement et l'hébergement d'applications web dynamiques.</p>
                
                <h3>Composants installés</h3>
                <ul>
                    <li><strong>Linux</strong> : Système d'exploitation</li>
                    <li><strong>Apache</strong> : Serveur HTTP</li>
                    <li><strong>MySQL/MariaDB</strong> : Système de gestion de base de données</li>
                    <li><strong>PHP</strong> : Langage de programmation côté serveur</li>
                </ul>
                
                <h3>Procédure d'installation</h3>
                <pre>
# Installation des composants
sudo apt update
sudo apt install apache2 mysql-server php libapache2-mod-php php-mysql

# Sécurisation de MySQL
sudo mysql_secure_installation

# Vérification de l'installation PHP
echo "<?php phpinfo(); ?>" | sudo tee /var/www/html/info.php
                </pre>
                
                <p>Cette pile technologique est idéale pour héberger des CMS comme WordPress, Drupal ou des applications web personnalisées.</p>
            `
        },
        'bind9': {
            title: 'Serveur DNS (Bind9)',
            content: `
                <h3>Résolution de noms de domaine</h3>
                <p>BIND (Berkeley Internet Name Domain) est le serveur DNS le plus utilisé sur Internet, particulièrement sur les systèmes Unix/Linux.</p>
                
                <h3>Fonctionnalités configurées</h3>
                <ul>
                    <li>Serveur DNS primaire et secondaire</li>
                    <li>Zones directes et inverses</li>
                    <li>Transferts de zone sécurisés</li>
                    <li>Mise en cache DNS</li>
                </ul>
                
                <h3>Configuration de base</h3>
                <pre>
# Installation
sudo apt install bind9 bind9utils bind9-doc

# Configuration d'une zone
zone "exemple.com" {
    type master;
    file "/etc/bind/zones/db.exemple.com";
    allow-transfer { 192.168.1.2; };
};

# Vérification de la configuration
sudo named-checkconf
sudo named-checkzone exemple.com /etc/bind/zones/db.exemple.com
                </pre>
                
                <p>Un serveur DNS correctement configuré est essentiel pour la résolution des noms de domaine en adresses IP et vice versa.</p>
            `
        },
        'rsync': {
            title: 'Serveur de sauvegarde (Rsync)',
            content: `
                <h3>Synchronisation et sauvegarde</h3>
                <p>Rsync est un outil puissant pour la synchronisation de fichiers et la création de sauvegardes efficaces en ne transférant que les différences entre les fichiers source et destination.</p>
                
                <h3>Fonctionnalités implémentées</h3>
                <ul>
                    <li>Sauvegardes incrémentielles</li>
                    <li>Compression des données</li>
                    <li>Transferts sécurisés via SSH</li>
                    <li>Exclusion de fichiers et répertoires</li>
                    <li>Scripts de sauvegarde automatisés</li>
                </ul>
                
                <h3>Exemple de script de sauvegarde</h3>
                <pre>
#!/bin/bash
# Sauvegarde avec rsync

SOURCE="/var/www/"
DESTINATION="/backup/www/"
LOG="/var/log/backup.log"

rsync -avz --delete --exclude="*.tmp" \\
    --log-file=$LOG $SOURCE $DESTINATION

# Rotation des sauvegardes
find /backup/archives/ -type f -mtime +30 -delete
                </pre>
                
                <p>Cette solution permet de maintenir des sauvegardes à jour tout en minimisant l'utilisation de la bande passante et de l'espace disque.</p>
            `
        },
        'ftp': {
            title: 'Serveur FTP (Proftpd)',
            content: `
                <h3>Transfert de fichiers sécurisé</h3>
                <p>ProFTPD est un serveur FTP hautement configurable qui permet le transfert sécurisé de fichiers entre clients et serveurs.</p>
                
                <h3>Configuration réalisée</h3>
                <ul>
                    <li>Authentification des utilisateurs</li>
                    <li>Chiffrement des connexions (FTPS)</li>
                    <li>Quotas d'espace disque</li>
                    <li>Restrictions d'accès par IP</li>
                    <li>Journalisation détaillée</li>
                </ul>
                
                <h3>Extrait de configuration</h3>
                <pre>
# Configuration de base
ServerName                      "Serveur FTP Sécurisé"
ServerType                      standalone
DefaultServer                   on
Port                            21
UseIPv6                         on
Umask                           022
MaxInstances                    30

# Configuration TLS/SSL
<IfModule mod_tls.c>
    TLSEngine                   on
    TLSRequired                 on
    TLSRSACertificateFile       /etc/ssl/certs/proftpd.crt
    TLSRSACertificateKeyFile    /etc/ssl/private/proftpd.key
</IfModule>
                </pre>
                
                <p>Le serveur FTP sécurisé permet aux utilisateurs de transférer des fichiers tout en garantissant la confidentialité et l'intégrité des données.</p>
            `
        },
        'apache': {
            title: 'Serveur web (Apache2)',
            content: `
                <h3>Hébergement de sites web</h3>
                <p>Apache HTTP Server est l'un des serveurs web les plus populaires au monde, offrant une plateforme robuste pour l'hébergement de sites et d'applications web.</p>
                
                <h3>Configuration implémentée</h3>
                <ul>
                    <li>Hébergement de sites multiples (VirtualHosts)</li>
                    <li>Configuration HTTPS avec Let's Encrypt</li>
                    <li>Modules de réécriture d'URL</li>
                    <li>Optimisation des performances</li>
                    <li>Protection contre les attaques courantes</li>
                </ul>
                
                <h3>Configuration d'un VirtualHost</h3>
                <pre>
<VirtualHost *:80>
    ServerName www.exemple.com
    ServerAlias exemple.com
    DocumentRoot /var/www/exemple.com/public_html
    ErrorLog ${APACHE_LOG_DIR}/exemple.com_error.log
    CustomLog ${APACHE_LOG_DIR}/exemple.com_access.log combined
    
    <Directory /var/www/exemple.com/public_html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Redirection vers HTTPS
    RewriteEngine on
    RewriteCond %{SERVER_NAME} =exemple.com [OR]
    RewriteCond %{SERVER_NAME} =www.exemple.com
    RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
                </pre>
                
                <p>Apache2 offre une grande flexibilité et de nombreuses fonctionnalités pour l'hébergement de sites web statiques et dynamiques.</p>
            `
        },
        'tls': {
            title: 'Chiffrement SSL/TLS',
            content: `
                <h3>Sécurisation des communications</h3>
                <p>SSL/TLS (Secure Sockets Layer/Transport Layer Security) est un protocole cryptographique qui sécurise les communications sur un réseau informatique.</p>
                
                <h3>Implémentation réalisée</h3>
                <ul>
                    <li>Génération et installation de certificats</li>
                    <li>Configuration de Let's Encrypt pour l'automatisation</li>
                    <li>Renforcement de la sécurité TLS</li>
                    <li>Redirection HTTP vers HTTPS</li>
                    <li>Tests de conformité et de sécurité</li>
                </ul>
                
                <h3>Commandes principales</h3>
                <pre>
# Installation de Certbot (Let's Encrypt)
sudo apt install certbot python3-certbot-apache

# Obtention d'un certificat
sudo certbot --apache -d exemple.com -d www.exemple.com

# Vérification de la configuration TLS
openssl s_client -connect exemple.com:443 -tls1_2

# Test de sécurité
curl https://www.ssllabs.com/ssltest/analyze.html?d=exemple.com
                </pre>
                
                <p>Le chiffrement SSL/TLS est essentiel pour protéger les données sensibles transmises entre les clients et les serveurs, notamment les informations d'authentification et les données personnelles.</p>
            `
        },
        'dhcp': {
            title: 'Serveur DHCP (ISC DHCP)',
            content: `
                <h3>Attribution automatique d'adresses IP</h3>
                <p>Le serveur DHCP (Dynamic Host Configuration Protocol) permet d'attribuer automatiquement des adresses IP et d'autres paramètres réseau aux clients d'un réseau local.</p>
                
                <h3>Configuration réalisée</h3>
                <ul>
                    <li>Définition de plages d'adresses IP</li>
                    <li>Réservations d'adresses IP fixes</li>
                    <li>Configuration des options DHCP (passerelle, DNS, etc.)</li>
                    <li>Intégration avec le serveur DNS</li>
                    <li>Configuration de sous-réseaux multiples</li>
                </ul>
                
                <h3>Extrait de configuration</h3>
                <pre>
# Configuration globale
default-lease-time 600;
max-lease-time 7200;
authoritative;

# Configuration du sous-réseau
subnet 192.168.1.0 netmask 255.255.255.0 {
    range 192.168.1.100 192.168.1.200;
    option routers 192.168.1.1;
    option domain-name-servers 192.168.1.10, 8.8.8.8;
    option domain-name "reseau.local";
}

# Réservation d'adresse IP fixe
host imprimante {
    hardware ethernet 00:11:22:33:44:55;
    fixed-address 192.168.1.50;
}
                </pre>
                
                <p>Un serveur DHCP bien configuré simplifie considérablement la gestion des adresses IP dans un réseau et facilite l'intégration de nouveaux équipements.</p>
            `
        },
        'f2b': {
            title: 'Solution banissement IP (Fail2ban)',
            content: `
                <h3>Protection contre les attaques</h3>
                <p>Fail2ban est un framework de prévention d'intrusion qui protège les serveurs contre les attaques par force brute et autres tentatives d'accès malveillantes.</p>
                
                <h3>Services protégés</h3>
                <ul>
                    <li>SSH (Secure Shell)</li>
                    <li>FTP (ProFTPD)</li>
                    <li>HTTP/HTTPS (Apache)</li>
                    <li>Mail (Postfix)</li>
                    <li>Base de données (MySQL)</li>
                </ul>
                
                <h3>Configuration personnalisée</h3>
                <pre>
# Configuration de la prison SSH
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600

# Configuration de la prison Apache
[apache-auth]
enabled = true
port = http,https
filter = apache-auth
logpath = /var/log/apache2/*error.log
maxretry = 5
bantime = 7200
                </pre>
                
                <p>Fail2ban analyse les fichiers journaux et bannit temporairement les adresses IP qui montrent des signes d'activité malveillante, renforçant ainsi considérablement la sécurité du serveur.</p>
            `
        },
        'samba': {
            title: 'Serveur Samba',
            content: `
                <h3>Partage de fichiers Linux/Windows</h3>
                <p>Samba est une implémentation du protocole SMB/CIFS qui permet le partage de fichiers et d'imprimantes entre systèmes Linux et Windows.</p>
                
                <h3>Configuration réalisée</h3>
                <ul>
                    <li>Partages de fichiers sécurisés</li>
                    <li>Intégration avec Active Directory</li>
                    <li>Authentification des utilisateurs</li>
                    <li>Contrôle d'accès basé sur les groupes</li>
                    <li>Journalisation des accès</li>
                </ul>
                
                <h3>Extrait de configuration</h3>
                <pre>
[global]
    workgroup = WORKGROUP
    server string = Serveur Samba
    security = user
    map to guest = bad user
    log file = /var/log/samba/log.%m
    max log size = 1000
    
[documents]
    path = /srv/samba/documents
    browseable = yes
    read only = no
    valid users = @utilisateurs
    create mask = 0660
    directory mask = 0770
    
[public]
    path = /srv/samba/public
    browseable = yes
    read only = yes
    guest ok = yes
                </pre>
                
                <p>Samba facilite l'interopérabilité entre les systèmes Linux et Windows, permettant un partage de fichiers transparent dans un environnement hétérogène.</p>
            `
        },
        'opn': {
            title: 'Pare-feu (OPNsense)',
            content: `
                <h3>Protection du réseau</h3>
                <p>OPNsense est une plateforme de pare-feu open source basée sur FreeBSD qui offre des fonctionnalités avancées de sécurité réseau.</p>
                
                <h3>Fonctionnalités configurées</h3>
                <ul>
                    <li>Filtrage de paquets</li>
                    <li>NAT (Network Address Translation)</li>
                    <li>VPN (OpenVPN et IPsec)</li>
                    <li>IDS/IPS (Suricata)</li>
                    <li>Proxy web (Squid)</li>
                    <li>Équilibrage de charge</li>
                </ul>
                
                <h3>Architecture déployée</h3>
                <p>Le pare-feu a été configuré avec trois interfaces réseau :</p>
                <ul>
                    <li><strong>WAN</strong> : Connexion à Internet</li>
                    <li><strong>LAN</strong> : Réseau interne sécurisé</li>
                    <li><strong>DMZ</strong> : Zone démilitarisée pour les serveurs accessibles depuis l'extérieur</li>
                </ul>
                
                <p>Des règles de filtrage strictes ont été mises en place pour contrôler le trafic entre les différentes zones et vers Internet, assurant ainsi une protection optimale du réseau contre les menaces externes.</p>
            `
        },
        'ws': {
            title: 'Active Directory (Windows Server)',
            content: `
                <h3>Gestion centralisée des utilisateurs</h3>
                <p>Active Directory est un service d'annuaire développé par Microsoft pour les réseaux Windows, permettant la gestion centralisée des utilisateurs, ordinateurs et autres ressources réseau.</p>
                
                <h3>Services déployés</h3>
                <ul>
                    <li>Domain Services (AD DS)</li>
                    <li>DNS intégré à AD</li>
                    <li>Group Policy Objects (GPO)</li>
                    <li>Certificate Services</li>
                    <li>Rights Management Services</li>
                </ul>
                
                <h3>Structure organisationnelle</h3>
                <p>L'annuaire a été organisé selon la structure suivante :</p>
                <pre>
Domain: entreprise.local
  |
  +-- OU: Utilisateurs
  |     |
  |     +-- OU: Direction
  |     +-- OU: Administratif
  |     +-- OU: Technique
  |
  +-- OU: Ordinateurs
  |     |
  |     +-- OU: Serveurs
  |     +-- OU: Postes de travail
  |
  +-- OU: Groupes
        |
        +-- OU: Sécurité
        +-- OU: Distribution
                </pre>
                
                <p>Des stratégies de groupe (GPO) ont été configurées pour appliquer automatiquement les paramètres de sécurité, les restrictions logicielles et les préférences utilisateur à travers l'organisation.</p>
            `
        },
        'zabbix': {
            title: 'Surveillance réseau (Zabbix)',
            content: `
                <h3>Monitoring des équipements</h3>
                <p>Zabbix est une solution de surveillance réseau open source qui permet de suivre la disponibilité et les performances des serveurs, équipements réseau et applications.</p>
                
                <h3>Fonctionnalités implémentées</h3>
                <ul>
                    <li>Surveillance des serveurs (CPU, mémoire, disque, réseau)</li>
                    <li>Monitoring des services (HTTP, FTP, SSH, etc.)</li>
                    <li>Surveillance des équipements réseau via SNMP</li>
                    <li>Alertes par email et SMS</li>
                    <li>Tableaux de bord personnalisés</li>
                    <li>Rapports automatisés</li>
                </ul>
                
                <h3>Architecture de surveillance</h3>
                <pre>
Serveur Zabbix
  |
  +-- Agent Zabbix (serveurs Linux/Windows)
  |
  +-- SNMP (switches, routeurs)
  |
  +-- Vérifications HTTP/HTTPS (sites web)
  |
  +-- Vérifications ICMP (ping)
                </pre>
                
                <p>Des déclencheurs (triggers) ont été configurés pour alerter automatiquement l'équipe technique en cas de problème, permettant une intervention rapide avant que les utilisateurs ne soient affectés.</p>
            `
        },
        'mysql': {
            title: 'Serveur base de données (MySQL)',
            content: `
                <h3>Gestion des données</h3>
                <p>MySQL est un système de gestion de base de données relationnelle open source largement utilisé pour stocker et gérer les données des applications web et d'entreprise.</p>
                
                <h3>Configuration réalisée</h3>
                <ul>
                    <li>Installation et configuration sécurisée</li>
                    <li>Optimisation des performances</li>
                    <li>Mise en place de réplication maître-esclave</li>
                    <li>Sauvegardes automatisées</li>
                    <li>Gestion des utilisateurs et des privilèges</li>
                </ul>
                
                <h3>Script de sauvegarde</h3>
                <pre>
#!/bin/bash
# Sauvegarde MySQL

DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/var/backups/mysql"
MYSQL_USER="backup_user"
MYSQL_PASSWORD="password_securise"

# Création du répertoire de sauvegarde
mkdir -p $BACKUP_DIR/$DATE

# Sauvegarde de toutes les bases
mysqldump --user=$MYSQL_USER --password=$MYSQL_PASSWORD \\
    --all-databases --events --routines --triggers \\
    | gzip > $BACKUP_DIR/$DATE/all_databases.sql.gz

# Rotation des sauvegardes (conservation 30 jours)
find $BACKUP_DIR -type d -mtime +30 -exec rm -rf {} \\;
                </pre>
                
                <p>La configuration de MySQL a été optimisée pour garantir à la fois la sécurité des données et les performances du serveur, tout en assurant la disponibilité des données grâce à un système de réplication et de sauvegarde robuste.</p>
            `
        }
    };
    
    // Ouvrir la modal avec la documentation correspondante
    function openDocModal(docId) {
        if (documentations[docId]) {
            modalTitle.textContent = documentations[docId].title;
            modalContent.innerHTML = documentations[docId].content;
            modal.style.display = 'block';
            
            // Effet de glitch sur le titre
            modalTitle.classList.add('glitch-text');
            setTimeout(() => {
                modalTitle.classList.remove('glitch-text');
            }, 1000);
        } else {
            modalTitle.textContent = 'Documentation non disponible';
            modalContent.innerHTML = '<p>La documentation pour cette technologie n\'est pas encore disponible.</p>';
            modal.style.display = 'block';
        }
    }
    
    // Ajouter les écouteurs d'événements
    docLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const docId = this.getAttribute('data-doc');
            openDocModal(docId);
        });
    });
    
    // Fermer la modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Fermer la modal en cliquant en dehors
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Configuration des fichiers à télécharger
    const downloadFiles = {
        'lxc': {
            filename: 'atelier_lxc.pdf',
            path: 'documents/ateliers/atelier_lxc.pdf'
        },
        'lamp': {
            filename: 'atelier_lamp.pdf',
            path: 'documents/ateliers/atelier_lamp.pdf'
        },
        'bind9': {
            filename: 'atelier_bind9.pdf',
            path: 'documents/ateliers/atelier_bind9.pdf'
        },
        'rsync': {
            filename: 'atelier_rsync.pdf',
            path: 'documents/ateliers/atelier_rsync.pdf'
        },
        'ftp': {
            filename: 'atelier_ftp.pdf',
            path: 'documents/ateliers/atelier_ftp.pdf'
        },
        'apache': {
            filename: 'atelier_apache.pdf',
            path: 'documents/ateliers/atelier_apache.pdf'
        },
        'tls': {
            filename: 'atelier_tls.pdf',
            path: 'documents/ateliers/atelier_tls.pdf'
        },
        'dhcp': {
            filename: 'atelier_dhcp.pdf',
            path: 'documents/ateliers/atelier_dhcp.pdf'
        },
        'fail2ban': {
            filename: 'atelier_fail2ban.pdf',
            path: 'documents/ateliers/atelier_fail2ban.pdf'
        },
        'samba': {
            filename: 'atelier_samba.pdf',
            path: 'documents/ateliers/atelier_samba.pdf'
        },
        'opnsense': {
            filename: 'atelier_opnsense.pdf',
            path: 'documents/ateliers/atelier_opnsense.pdf'
        },
        'ws': {
            filename: 'atelier_active_directory.pdf',
            path: 'documents/ateliers/atelier_active_directory.pdf'
        },
        'zabbix': {
            filename: 'atelier_zabbix.pdf',
            path: 'documents/ateliers/atelier_zabbix.pdf'
        },
        'mysql': {
            filename: 'atelier_mysql.pdf',
            path: 'documents/ateliers/atelier_mysql.pdf'
        },
        'ssh': {
            filename: 'atelier_ssh.pdf',
            path: 'documents/ateliers/atelier_ssh.pdf'
        },
        'mfa': {
            filename: 'atelier_mfa.pdf',
            path: 'documents/ateliers/atelier_mfa.pdf'
        }
    };
    
    // Gérer les téléchargements
    function handleDownload(downloadId) {
        if (downloadFiles[downloadId]) {
            const fileInfo = downloadFiles[downloadId];
            
            // Création d'une notification de téléchargement
            const notification = document.createElement('div');
            notification.className = 'download-notification';
            notification.innerHTML = `<i class="fas fa-download"></i> Téléchargement de ${fileInfo.filename} en cours...`;
            document.body.appendChild(notification);
            
            // Simuler un téléchargement (dans un environnement réel, cela serait un lien direct vers le fichier)
            setTimeout(() => {
                // Redirection vers le fichier à télécharger
                window.location.href = fileInfo.path;
                
                // Supprimer la notification après un délai
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            }, 500);
        } else {
            console.error(`Fichier de téléchargement non trouvé pour l'ID: ${downloadId}`);
            alert('Le fichier demandé n\'est pas disponible pour le téléchargement.');
        }
    }
    
    // Ajouter les écouteurs d'événements pour les boutons de téléchargement
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const downloadId = this.getAttribute('data-download');
            handleDownload(downloadId);
        });
    });
    
    // Ajouter un effet de survol sur les cartes
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.tech-icon i');
            icon.classList.add('pulse');
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.tech-icon i');
            icon.classList.remove('pulse');
        });
    });
});
