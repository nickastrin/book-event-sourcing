using BookTracker.Api.Features.Books.Models;
using JasperFx;
using JasperFx.Events.Projections;
using Marten;
using Marten.Events.Projections;
using Microsoft.OpenApi;

namespace BookTracker.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc(
                "v1",
                new OpenApiInfo { Title = "Book Tracker API", Version = "v1" });
        });

        return services;
    }
    
    public static IServiceCollection AddMartenConfig(
        this IServiceCollection services,
        IConfiguration configuration,
        IWebHostEnvironment environment)
    {
        var connectionString = configuration.GetConnectionString("BookTracker")
            ?? throw new Exception("Connection string not found");

        services.AddMarten(source => { 
            source.Connection(connectionString);
            source.Projections.Snapshot<Book>(SnapshotLifecycle.Inline);
            
            if (environment.IsDevelopment())
            {
                source.AutoCreateSchemaObjects = AutoCreate.All;
            }
        });

        return services;
    }
}